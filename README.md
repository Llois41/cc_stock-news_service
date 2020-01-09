# cc_stock-news_service

Ich hab das Dockerfile angepasst, Du kannst Dir die Änderungen ja mal ansehen, um es nachzuvollziehen. Ansonsten hab ich mal Deinen bin/www Ordner gelöscht, da Du die App über 'node app.js' startest und nicht über die bin/www.

Der Container läuft, aber du bekommst im Container eine Fehlermeldung, dass die DB nicht verfügbar ist, wenn diese nicht auf dem entsprechenden Port läuft. Probier als nächstes mal die DB in einen Container zu packen und beides zu starten, das sollte relativ einfach gehen denk ich. Ansonsten können wir morgen ja noch mal drüber sprechen.