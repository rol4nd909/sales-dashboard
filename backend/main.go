package main

import (
	"crypto/sha1"
	"encoding/binary"
	"encoding/json"
	"log/slog"
	"math/rand"
	"net/http"
	"os"
	"time"
)

var metrics = map[string]metricConfig{
	"total-revenue": {
		Constant: 20_000,
		Variable: 5_000,
	},
	"total-pax": {
		Constant: 1_000,
		Variable: 250,
	},
}

type metricConfig struct {
	Constant float64
	Variable float64
}

type DataPoint struct {
	Timestamp string  `json:"timestamp"`
	Value     float64 `json:"value"`
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/{metric}", func(w http.ResponseWriter, r *http.Request) {
		metric := r.PathValue("metric")
		conf, ok := metrics[metric]
		if !ok {
			badRequest(w, "unknown metric")
			return
		}
		from, err := time.Parse(time.DateOnly, r.URL.Query().Get("from"))
		if err != nil {
			badRequest(w, "invalid `from` date")
			return
		}
		to, err := time.Parse(time.DateOnly, r.URL.Query().Get("to"))
		if err != nil {
			badRequest(w, "invalid `to` date")
			return
		}
		if from.After(to) {
			badRequest(w, "`from` date is after `to` date")
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		if err := json.NewEncoder(w).Encode(generateDataPoints(metric, conf, from, to)); err != nil {
			slog.Error(err.Error())
		}
	})

	if err := http.ListenAndServe(":8080", mux); err != nil {
		slog.Error(err.Error())
		os.Exit(1)
	}
	os.Exit(0)
}

func badRequest(w http.ResponseWriter, msg string) {
	w.WriteHeader(http.StatusBadRequest)
	if _, err := w.Write([]byte(msg)); err != nil {
		slog.Error(err.Error())
	}
}

func generateDataPoints(metric string, conf metricConfig, from, to time.Time) []DataPoint {
	var dataPoints []DataPoint
	for date := from; !date.After(to); date = date.Add(24 * time.Hour) {
		dataPoints = append(dataPoints, generateDataPoint(metric, conf, date))
	}

	return dataPoints
}

func generateDataPoint(metric string, conf metricConfig, date time.Time) DataPoint {
	h := sha1.New()
	h.Write([]byte(metric))
	h.Write([]byte(date.Format(time.DateOnly)))
	seed := binary.BigEndian.Uint64(h.Sum(nil))
	r := rand.New(rand.NewSource(int64(seed)))

	return DataPoint{
		Timestamp: date.Format(time.DateOnly),
		Value:     conf.Constant + r.Float64()*conf.Variable,
	}
}
