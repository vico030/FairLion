# FairLion

## Für Nutzer:innen:

### Projektbeschreibung

Jeder hat diesen einen Freund, der sich ständig Dinge ausleiht, diese aber erst nach mehrmaligem Nachfragen und Monate verspätet zurück gibt. Um dieses Problem in Zukunft vermeidbar zu machen, haben wir im Rahmen des Projekt-Moduls im Wintersemester 2020 die App “FairLion” erstellt. Diese vereinfacht das Verleihen von Gegenständen zwischen Freunden, Nachbarn und Familienmitgliedern, indem sie Überblick darüber verschafft, was sich gerade in Umlauf befindet. Sie ermöglicht den Nutzern sowohl das Anbieten als auch das Ausleihen von Gegenständen. Es soll hierbei allerdings kein allgemeiner Marketplace entstehen, sondern vielmehr ein Werkzeug zur Interaktion zwischen Personen, die sich auch persönlich kennen. Daher können Anfragen nur zwischen bestätigten Freunden verschickt werden. Darüber hinaus können zeitliche Vorgaben für die Ausleihen erstellt werden, wodurch die Nutzer benachrichtigt werden, sobald die Frist in naher Zukunft ausläuft. So kann vermieden werden, dass in Vergessenheit gerät, wem jemand etwas zu welchem Zeitpunkt ausgeliehen hat. Die Bilder, die beim Erstellen des Angebots hochgeladen wurden, können dazu dienen, Gebrauchsspuren oder Beschädigungen, die erst nach der Ausleihe zustanden gekommen sind, nachzuweisen. Zu guter Letzt können Nutzer ausleihbare Gegenstände auch favorisieren, wenn sie bereits wissen, dass sie diese in Zukunft ein weiteres Mal benötigen.

### Nutzen der Anwendung für die Nutzer

Nutzer können ohne viel Aufwand nachsehen, ob ihre Freunde Gegenstände zum Verleih anbieten, ohne jeden einzeln kontaktieren zu müssen. Zudem werden die Nutzer rechtzeitig erinnert, ob Gegenstände zurückgebracht werden müssen oder zur Rückgabe bereit sind. Ein plötzliches Verschwinden der Gegenstände ist auf diese Weise nicht mehr möglich. 

### Kurzanleitung

Neben einem Splash- und Login/Registrierungs-Screen stellen die fünf Tabs "Ausgeliehen", "Lager", "Suche", "Anfragen" und "Freunde" den Hauptteil der Anwendung dar. Von dort können diverse Untermenüs, Profile und Editoren aufgerufen werden, um die Verleih- und Ausleihprozesse hinlänglich abzubilden.

Sobald der Einloggprozess abgeschlossen ist, befindet sich der Nutzer auf der "Ausgeliehen"-Ansicht. Hier tauchen die Artikel auf, die der Nutzer aktuell von anderen Nutzern ausgeliehen hat. Von hier kann er sofort zu einer Detailansicht eines beliebigen Artikels wechseln, um ihn genau zu prüfen oder um die Rückgabe an den Besitzer einzuleiten.

Über die Tab-Bar am unteren Bildschirmrand kann zur Ansicht "Lager" gewechselt werden. Hier tauchen die Artikel aus eigenem Besitz auf, die der Nutzer sich entschlossen hat, zu verleihen. Neben einer Darstellung, welche Artikel gerade an welche anderen Nutzer verliehen sind, können hier auch neue Artikel zum Verleihen in die Sammlung aufgenommen werden.

Möchte sich ein Nutzer einen Artikel von jemand anderem ausleihen, muss er auf den "Suche"-Tab wechseln. Dieser zeigt initial die Artikel, die der Nutzer - beispielsweise für nochmalige oder spätere Ausleihen - favorisiert hat. Über die Suchleiste am oberen Bildschirmrand und die Kategorie-Filterauswahl können neue Artikel gefunden und deren Ausleihe bei deren Besitzern beantragt werden.

Diese Ausleihanfragen tauchen danach beim entsprechenden Nutzer im Tab "Anfragen" auf. Hier kann diesen mit einem einfachen Klick zugestimmt oder widersprochen werden. Auch Anfragen für neue Freunde und Artikelrückgaben werden hier angezeigt und können auf gleiche Weise bearbeitet werden.
   
Die Liste der aktuell verknüpften Freunde wird dem Nutzer im Tab "Freunde" angezeigt. Dort können deren Profile und Artikel angesehen und neue Freunde per Suche hinzugefügt werden.

### Aktueller Projektstand

Nahezu alle von uns im Voraus erdachten Funktionen wurden in der finalen App implementiert. Sie befindet sich in einem nutzbaren Zustand. Für die Zukunft könnten folgende Aspekte noch verbessert / integriert werden:

* Backend mit kostenpflichtigen SSL-Zertifikat ausstatten (für iOS-Support)
* Code bereinigen / ausführliche Logs darstellen / Kommentare & Dokumentation anfertigen
* Web Client gestalten

### Kurzanleitung

* .apk auf einem Android-Gerät installieren
* App öffnen und Konto anlegen
* Freunde hinzufügen
* Artikel suchen
* Loslöwen! :)

### Screenshots

![Login Screen]()
![Ausgeliehen Screen]()
![Lager Screen]()
![Suche Screen]()
![Anfragen Screen]()
![Freunde Screen]()
![App Drawer]()

## Arbeitsaufteilung und Rollen

* Marvin Heiden - Product Owner, Backend
* Vico Tünke - Scrum Master, Frontend
* Moritz Kolbe - Frontend
* John Einicke - DevOps, Backend
* Lukas Heuveling - Frontend
* Talha Dagli - Backend, Frontend

## Für Entwickler:

### Grobe Architektur

![Architektur-Skizze](/architecture.png)

Unser Projekt besteht aus einer App als Frontend und einem serverseitigen Backend. Die App wurde mit dem React-Native Framework und der Plattform Expo in JavaScript erstellt. Für das Backend wurde ebenfalls JavaScript verwendet. Als Datenbank kommt bei uns MongoDb zum Einsatz.

### Build & Run

#### Expo Go

Installieren:
* Download Expo Go from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) / [Apple App Store](https://apps.apple.com/de/app/expo-go/id982107779)
* Download & install [MongoDB](https://www.mongodb.com/de)

Starten:
* create `.env` in `Backend` like `env.example`
* `cd Backend`
* `npm install`
* `npm start`
* `cd ../Frontend`
* `npm install`
* `npm run set-local`
* `npm start`
* Scan QR-Code with Expo Go
* App launches

#### APK

* `cd ../Frontend`
* `npm install`
* `expo build:android -t apk`
* Download .apk from Expo-link
* Transfer .apk to phone or emulator
* Install .apk
* Launch App

### Genutzte Technologien

* JavaScript
* NodeJS
* Git
* React-Native
* Expo
* MongoDB
* Amazon Web Services
* Discord

## Links

* AWS-Backend-Instanz: [http://18.185.102.149/] 
* Trello-Backlog: [https://trello.com/b/b3V4engm/fairlion]
* Git-Repository: [https://github.com/vico030/FairLion]
* Release-Branch: [https://github.com/vico030/FairLion/tree/release]
* APK-Artefakt: [https://github.com/vico030/FairLion/tree/release/Artifacts]
