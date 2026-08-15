from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .scheduler import optimize
from .simulation import environmental_profile

app = FastAPI(title='AquaCool AI Simulation API')
app.add_middleware(CORSMiddleware, allow_origins=['http://localhost:5173'], allow_methods=['*'], allow_headers=['*'])

@app.get('/api/health')
def health():
    return {'status': 'ok', 'mode': 'deterministic simulation'}

@app.get('/api/environment')
def environment():
    return environmental_profile(48)

@app.post('/api/optimize')
def run_optimization(payload: dict):
    return optimize(payload)
