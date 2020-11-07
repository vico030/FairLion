# FairLion

## Projektbeschreibung

Jeder hat diesen einen Freund, der sich ständig Dinge ausleiht, diese aber erst nach mehrmaligem Nachfragen und Monate verspätet zurück gibt. Um dieses Problem in Zukunft vermeidbar zu machen, erstellen wir im Rahmen des Projekt-Moduls im Wintersemester 2020 die App “FairLion”. Diese soll das Verleihen von Gegenständen zwischen Freunden, Nachbarn und Familienmitgliedern vereinfachen, indem sie Überblick darüber verschafft, was sich gerade in Umlauf befindet. Sie ermöglicht den Nutzern sowohl das Anbieten als auch das Ausleihen von Gegenständen. Es soll hierbei allerdings kein allgemeiner Marketplace entstehen, sondern vielmehr ein Werkzeug zur Interaktion zwischen Personen, die sich auch persönlich kennen. Daher können Anfragen nur zwischen bestätigten Freunden verschickt werden. Darüber hinaus können zeitliche Vorgaben für die Ausleihen erstellt werden, wodurch die Nutzer benachrichtigt werden, sobald die Frist in naher Zukunft ausläuft. So kann vermieden werden, dass in Vergessenheit gerät, wem jemand etwas zu welchem Zeitpunkt ausgeliehen hat. Die Bilder, die beim Erstellen des Angebots hochgeladen wurden, können dazu dienen, Gebrauchsspuren oder Beschädigungen, die erst nach der Ausleihe zustanden gekommen sind, nachzuweisen. Zu guter Letzt können Nutzer ausleihbare Gegenstände auch favorisieren, wenn sie bereits wissen, dass sie diese in Zukunft ein weiteres Mal benötigen.

## Nutzen der Anwendung für die Nutzer
Nutzer können ohne viel Aufwand nachsehen, ob ihre Freunde Gegenstände zum Verleih anbieten, ohne jeden einzeln kontaktieren zu müssen. Zudem werden die Nutzer rechtzeitig erinnert, ob Gegenstände zurückgebracht werden müssen oder zur Rückgabe bereit sind. Ein plötzliches Verschwinden der Gegenstände ist auf diese Weise nicht mehr möglich. 

## Gruppenzusammensetzung und Rollen

* Marvin Heiden - Product Owner, Backend
* Vico Tünke - Scrum Master, Frontend
* Moritz Kolbe - Frontend
* John Einicke - Backend
* Lukas Heuveling - Frontend
* Talha Dagli - Backend, Frontend

## Beschreibung des Prototypen

[Link zum Prototypen](https://www.figma.com/proto/PrKrtmLe2xtWkIJp2A2Did/FairLion?node-id=66%3A1439&scaling=min-zoom)

Der vorliegende Prototyp wurde mit dem Tool Figma erstellt und bildet grob die Funktionalität unseres angestrebten Produktes ab. Zu diesem Zweck haben wir die wichtigsten Ansichten der FairLion-App bereits ausgestaltet und nach Möglichkeit miteinander verknüpft. Neben einem Splash- und Login/Registrierungs-Screen stellen die fünf Tabs "Ausgeliehen", "Lager", "Suche", "Anfragen" und "Freunde" den Hauptteil der Anwendung dar. Von dort können diverse Untermenüs, Profile und Editoren aufgerufen werden, um die Verleih- und Ausleihprozesse hinlänglich abzubilden. Auch das Farbschema und das vorläufige Logo wurden bereits an den entsprechenden Stellen eingesetzt.
Sobald der Einloggprozess abgeschlossen ist, befindet sich der Nutzer auf der "Ausgeliehen"-Ansicht. Hier tauchen die Artikel auf, die der Nutzer aktuell von anderen Nutzern ausgeliehen hat. Von hier kann er sofort zu einer Detailansicht eines beliebigen Artikels wechseln, um ihn genau zu prüfen oder um die Rückgabe an den Besitzer einzuleiten.

Über die Tab-Bar am unteren Bildschirmrand kann zur Ansicht "Lager" gewechselt werden. Hier tauchen die Artikel aus eigenem Besitz auf, die der Nutzer sich entschlossen hat, zu verleihen. Neben einer Darstellung, welche Artikel gerade an welche anderen Nutzer verliehen sind, können hier auch neue Artikel zum Verleihen in die Sammlung aufgenommen werden.
Möchte sich ein Nutzer einen Artikel von jemand anderem ausleihen, muss er auf den "Suche"-Tab wechseln. Dieser zeigt initial die Artikel, die der Nutzer - beispielsweise für nochmalige oder spätere Ausleihen - favorisiert hat. Über die Suchleiste am oberen Bildschirmrand und die Kategorie-Filterauswahl können neue Artikel gefunden und deren Ausleihe bei deren Besitzern beantragt werden.

Diese Ausleihanfragen tauchen danach beim entsprechenden Nutzer im Tab "Anfragen" auf. Hier kann diesen mit einem einfachen Klick zugestimmt oder widersprochen werden. Auch Anfragen für neue Freunde werden hier angezeigt und können auf gleiche Weise bearbeitet werden.
   
Die Liste der aktuell verknüpften Freunde wird dem Nutzer im Tab "Freunde" angezeigt. Dort können deren Profile und Artikel angesehen und neue Freunde per Suche hinzugefügt werden.


## Technische Voraussetzungen

Für die Verwendung unserer Anwendung wird ein Smartphone benötigt. Das Gerät benötigt entweder eine Android-Version von 4.1 oder höher oder eine iOS-Version von 10.0 oder höher.
Damit sich die App mit unserem Server verbinden kann, wird außerdem eine aktive Internetverbindung benötigt.
Die Nutzer benötigen für die Registrierung eine funktionierende Email-Adresse.
Als Framework für das Frontend verwenden wir React Native und für das Backend benutzen wir Express und MongoDB. Der Backend-Bestandteil unserer App wir über einen AWS-Server zur Verfügung gestellt. Für die Entwicklung und das Testen unserer App benötigen wir ein Smartphone welches Android und ein Smartphone welches iOS verwendet. 

## Grobe Architektur

![Architektur-Skizze](/architecture.png)

## Mögliche Herausforderungen

Im Laufe des Projektes werden wir möglicherweise auf einige Herausforderungen treffen, sowohl in technischer als auch in organisatorischer/kommunikativer Hinsicht.
Mitunter müssen wir uns darauf einstellen, dass es bei der Verknüpfung von Frontend und Backend zu Schnittstellen-Problemen kommen kann. Um Komplikationen zu vermeiden müssen wir uns klar verständigen, welche Informationen in welcher Form das Backend anbieten soll bzw. das Frontend braucht.
Auch die Anbindung an einen Datenbank-Server ist etwas, womit wir noch wenig Erfahrung haben. Da der Umstieg von lokalen Datenbanken aber rein logisch keinen Unterschied macht, gehen wir eher nicht davon aus, Code umschreiben zu müssen.
Die souveräne Nutzung von git wird zu sechst definitiv etwas sein, dem man Beachtung schenken muss, um Konflikte und Unverständlichkeiten zu vermeiden.

## Grobe Zeitplanung

Wir haben die Entwicklungszeit unserer App vorerst in zwei große Phasen unterteilt.
In der ersten Phase wird das Frontend-Team an der Erstellung der visuellen Oberfläche der App arbeiten und somit den Prototypen in die Realität bringen. Hierfür verwenden wir zunächst Dummy-Daten zum Befüllen der einzelnen Programmteile. Währenddessen wird das Backend-Team damit beginnen, erste Features (Login, Account erstellen) zu implementieren und eine Verbindung zu einer zunächst lokal gehosteten Datenbank anlegen.
\newline
Die zweite Phase, beginnend im neuen Jahr, wird das Frontend-Team dafür nutzen, das erstellte Frontend mit dem Backend zu verknüpfen. Das andere Team wird hingegen das Backend auf einen AWS-Server deployen. Im Anschluss werden alle Features auf ihre Funktionsfähigkeit getestet.

## Links

* [Trello-Invite](https://trello.com/invite/b/b3V4engm/7f11ce71231e3a0cf81617e8e8a9e9bf/auslion)
* [Trello-Board](https://trello.com/b/b3V4engm/fairlion)
* [Git-Repository](https://github.com/vico030/FairLion)