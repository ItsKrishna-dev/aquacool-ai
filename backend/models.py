from pydantic import BaseModel, Field
from typing import Literal

Priority = Literal['Low', 'Medium', 'High', 'Critical']

class Workload(BaseModel):
    id: str
    name: str
    cpu: int = Field(ge=1, le=128)
    memory: int = Field(ge=1, le=1024)
    duration: int = Field(ge=1, le=24)
    priority: Priority
    flexible: bool
    deadline: int = Field(ge=0, le=48)
    baseline_start: int = Field(ge=0, le=47)

class OptimizeRequest(BaseModel):
    workloads: list[Workload]
    carbon_weight: float = Field(default=0.4, ge=0, le=1)
    water_weight: float = Field(default=0.35, ge=0, le=1)
    delay_weight: float = Field(default=0.25, ge=0, le=1)
    capacity: int = Field(default=24, ge=1, le=256)
    water_stress: float = Field(default=0.6, ge=0, le=1)

class OptimizationResponse(BaseModel):
    workloads: list[dict]
    metrics: dict
    rejected_windows: dict[str, list[dict]]
    environmental: list[dict]
