# IPL Backend

This backend is built using Django and Django REST Framework. It manages IPL match data and provides APIs to get match statistics and bowling details.

#How to Set Up

Create a virtual environment:
python -m venv venv

Activate the environment:

Windows:

venv\Scripts\activate


Mac/Linux:

source venv/bin/activate


Install required packages:

pip install -r requirements.txt


Start the server:

python manage.py runserver


Server will run at: http://127.0.0.1:8000/

APIs

/matches-per-year/ : Shows total matches played in each season

/matches-won/ : Shows how many matches each team won per season

/extra-runs/<year>/ : Shows extra runs given by each team in the chosen year

/top-bowlers/<year>/ : Shows top 10 bowlers with best economy in that year

/matches-played-won/<year>/ : Shows number of matches played vs won for each team




## Frontend README 

# IPL Frontend

This frontend is built with React. It fetches data from the backend and displays charts and stats about IPL matches.

## How to Set Up

Install dependencies:

npm install


Run the frontend:

npm start


The app will run at: http://localhost:3000/

Project Structure

src/ : Contains React components

public/ : HTML and static files

package.json : Project dependencies and scripts
