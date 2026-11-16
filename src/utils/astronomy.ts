import type { PlanetId } from '../data/planets';

export function getSidePlanets(featured: PlanetId, order: readonly PlanetId[]): [PlanetId, PlanetId] {
  const idx = order.indexOf(featured);
  if (idx === -1 || order.length < 3) {
    return [order[0] ?? 'venus', order[1] ?? 'mars'];
  }
  const left = order[(idx - 1 + order.length) % order.length];
  const right = order[(idx + 1) % order.length];
  return [left, right];
}

export function calculateWeightOnPlanet(
  earthMassKg: number,
  planetGravityMs2: number
): { newtons: number; earthEquivalentKg: number } {
  const safeMass = Number.isFinite(earthMassKg) && earthMassKg >= 0 ? earthMassKg : 0;
  const safeGravity = Number.isFinite(planetGravityMs2) && planetGravityMs2 >= 0 ? planetGravityMs2 : 0;
  const newtons = safeMass * safeGravity;
  const earthEquivalentKg = newtons / 9.81;
  return {
    newtons: Math.round(newtons * 10) / 10,
    earthEquivalentKg: Math.round(earthEquivalentKg * 10) / 10,
  };
}

export function calculateKeplerPeriodYears(semiMajorAxisAu: number): number {
  const a = Math.max(0.1, semiMajorAxisAu);
  return Math.round(Math.pow(a, 1.5) * 100) / 100;
}

export function calculateOrbitalVelocityKmS(semiMajorAxisAu: number): number {
  const a = Math.max(0.1, semiMajorAxisAu);
  return Math.round((29.78 / Math.sqrt(a)) * 100) / 100;
}

export function calculateEscapeVelocityKmS(massEarths: number, radiusEarths: number): number {
  const m = Math.max(0.01, massEarths);
  const r = Math.max(0.1, radiusEarths);
  return Math.round(11.186 * Math.sqrt(m / r) * 100) / 100;
}

export function calculateSurfaceGravityG(massEarths: number, radiusEarths: number): number {
  const m = Math.max(0.01, massEarths);
  const r = Math.max(0.1, radiusEarths);
  return Math.round((m / (r * r)) * 100) / 100;
}

export interface TuitionCalculationInput {
  earlyBirdPrice: number;
  standardPrice: number;
  isEarlyBird: boolean;
  discountPercent: number;
  addTelescopeLab: boolean;
}

export function calculateTuitionTotal(input: TuitionCalculationInput): {
  base: number;
  discountAmount: number;
  addOnAmount: number;
  total: number;
} {
  const base = input.isEarlyBird ? input.earlyBirdPrice : input.standardPrice;
  const discountAmount = Math.round(base * (input.discountPercent / 100));
  const addOnAmount = input.addTelescopeLab ? 45 : 0;
  const total = Math.max(0, base - discountAmount + addOnAmount);
  return { base, discountAmount, addOnAmount, total };
}
