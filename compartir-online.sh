#!/usr/bin/env bash
# Publica el sitio Flor de Café con un túnel de Cloudflare (para verlo en remoto).
# Deja esta ventana ABIERTA. La URL pública aparece abajo (termina en .trycloudflare.com).
cd "$(dirname "$0")"
PORT=5570
if ! (ss -ltn 2>/dev/null | grep -q ":$PORT"); then
  echo ">> Iniciando servidor local en http://localhost:$PORT ..."
  setsid nohup python3 -m http.server "$PORT" >/tmp/flor_srv.log 2>&1 < /dev/null &
  sleep 2
fi
echo ">> Abriendo túnel público (busca la línea https://...trycloudflare.com):"
exec "$HOME/.local/bin/cloudflared" tunnel --url "http://localhost:$PORT" --no-autoupdate
