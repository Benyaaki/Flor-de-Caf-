#!/usr/bin/env bash
# Lanzador del sitio Flor de Café — deja esta ventana ABIERTA mientras revisas.
cd "$(dirname "$0")"
PORT=5570
echo "======================================================"
echo "  Flor de Café sirviéndose en:"
echo "    http://localhost:$PORT/            (inicio)"
echo "    http://localhost:$PORT/carta.html  (carta)"
echo ""
echo "  Deja esta ventana abierta. Corta con Ctrl+C."
echo "======================================================"
# Reintenta si el puerto está ocupado o el proceso muere
while true; do
  python3 -m http.server "$PORT" || true
  echo ">> El servidor se detuvo, reintentando en 1s..."
  sleep 1
done
