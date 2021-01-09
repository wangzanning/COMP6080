# How to start the RESTFUL API server

## Steps to complete once

Only complete these steps once.

Clone this repository somewhere (CSE servers or local machine).

If you aren't on the CSE machines, you may have to install `python3-pip` and/or `python3` before running the server. Installation varies depending on operating system and version, but in general for unix machines you can do:
* `sudo apt install python3`
* `sudo apt install python3-pip`

Within your `backend` folder in your project repo (i.e. the folder this `README.md` is in), run:

```bash
pip3 install -r requirements.txt # You only have to do this once
```

## Running the server

You complete this step every time you want to start the server.

Within your `backend` folder in your project repo (i.e. the folder this `README.md` is in), run:

```bash
python3 run.py # This will start the server, you do this each time you want it to run
```

Note: You must be using at least python 3.6. If using the CSE machines, just using "python3" will provide the appropriate version.

## Other notes

* You are welcome to use `virtualenv` to isolate these dependencies to the particular project. This is not required in this course, though, and is not required.
* If you get "Address already in use" error, try changing the line `app.run(debug=True)` to `app.run(debug=True, port=XXXX)` with a random port number between 10000 and 50000. This line is in `run.py`
