## Dokumentation

Die Dokumentation des Proof-of-Concept liegt innerhalb des Ordners mit dem Pfad `proof-of-concept/documentation`.

Die Schritte der Planung der Programmierung der Webapplikation finden sich in Kapitel 3 (Technische Konzeption) der Thesis.

Die Deskription von ausgewählten Details der Programmierung finden sich in Kapitel 5 (Ergebnisse) der Thesis.

## Setup

Zum starten der Webapplikation sollte mit dem Terminal in den Ordner mit dem Namen `proof-of-concept` navigiert werden.

Zunächst muss sichergestellt werden, dass auf dem genutzten lokalen Rechner die `Latest Stable Version` von Node.js installiert ist.

Webseite: https://nodejs.org/en/download/.

Bei dem Setup von Node.js sollte die C++ Compiler Extension Checkmark gesetzt sein, d.h. mitinstalliert werden.
<br>

<img src="C++ Compiler Extension for Node.js.webp" alt="Markdown Monster icon" style="float: left; margin-right: 10px;" /> <br><br>

Dann sollte Angular installiert werden mit dem Befehl `npm install -g @angular/cli`.

Der nächste Schritt kann zunächst übersprungen werden, aber sollte es zu Problemen kommen, kann es sein, dass Node.js keine PowerShell Scripts ausführen darf.

Wird mit Windows gearbeitet, kann dann der folgende Befehl (Windows Power Shell) die Ausführung von PowerShell Scripts erlauben: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`.

Eine Erklärung dazu findet sich in der Angular Dokumentation: https://angular.io/guide/setup-local.

Der nachfolgende Schritt ist dann aber unbedingt nötig, mit dem Befehl `npm install` werden die Node.js-Dependencies des proof-of-concept installiert.

Danach kann mit dem Befehl `ng serve` der Development-Server der Webapplikation gestartet werden.

Das grafische Benutzer-Interface der Webapplikation kann daraufhin mit einem Internet-Browser, z.B. Google Chrome, mit dem Abruf der Andresse http://localhost:4200 navigiert werden.

## Zusammenfassung

Webapplikation mit den Technologien Node.js, Angular, Leonardo.AI.

Das Projekt verfolgt die prototypische Realisierung des Konzepts der Bachelor-Thesis mit dem Titel:

<Konzeption und prototypische Entwicklung einer Webapplikation für Kinder zum Verfassen von Kurzgeschichten>,

Hochschule der Medien Stuttgart, von Clemens Feth, Wintersemester 2023.2024.

Mit Hilfe der Webapplikation können die Nutzer Kurzgeschichten verfassen und diese abschnittweise während des Schreibens mit der Nutzung der Leonardo.AI-API in Bilder transformieren lassen.

Dementsprechend kreiert der Nutzer in der Webapplikation seine eigenen illustrierten Kurzgeschichten.

Die Text-zu-Bild-Transformation wird mit Ansprache der Leonardo.AI-API realisiert.

Des Weiteren wird dem Nutzer die Chance gegeben, die Rechtsschreibprüfung durchführen zu lassen.

Grammatikalisch falsche Textstellen werden dann rot unterstrichen.

Der Grammatik-Test kann aber per Button-Klick an- und abgestellt werden und damit zielgerichteter eingesetzt werden.

Dies ist ein Resultat aus Kapitel 2.2.1 (Kreatives Schreiben), das gezeigt hat, dass es zu Schreibhemmungen bzw. Ängstlichkeit bei den Kindern führen kann, wenn Rechtschreibfehler nicht zunächst zugelassen werden.

Deswegen wurde davon abgesehen, Rechtschreibfehler innerhalb der Webapplikation sofort und immer rot zu unterstreichen. Stattdessen gibt es dafür den Button "Grammatik-Test anschalten" bzw. "Grammatik-Test ausschalten".

Die Rechtschreibprüfung des Browsers wird verwendet. Dort sollte sie in den Browser-Einstellungen für die gewünschten Sprachen aktiviert werden, z.B. Deutsch und Englisch.

Weitere Features: Templates (angefangene Kurzgeschichten), Navigation.
