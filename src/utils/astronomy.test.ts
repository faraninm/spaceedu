import test from 'node:test';
import assert from 'node:assert/strict';
import { PLANET_ORDER, PLANETS } from '../data/planets';
import {
  getSidePlanets,
  calculateWeightOnPlanet,
  calculateKeplerPeriodYears,
  calculateOrbitalVelocityKmS,
  calculateEscapeVelocityKmS,
  calculateSurfaceGravityG,
  calculateTuitionTotal,
} from './astronomy';

test('getSidePlanets preserves EARTH -> VENUS left / MARS right on load and wraps cleanly across all 8 planets', () => {
  assert.deepEqual(getSidePlanets('earth', PLANET_ORDER), ['venus', 'mars']);
  assert.deepEqual(getSidePlanets('mercury', PLANET_ORDER), ['neptune', 'venus']);
  assert.deepEqual(getSidePlanets('neptune', PLANET_ORDER), ['uranus', 'mercury']);
  assert.deepEqual(getSidePlanets('saturn', PLANET_ORDER), ['jupiter', 'uranus']);
});

test('all 8 solar system planets exist with valid physical telemetry', () => {
  assert.equal(PLANET_ORDER.length, 8);
  for (const id of PLANET_ORDER) {
    const p = PLANETS[id];
    assert.ok(p.name.length > 0);
    assert.ok(p.diameterKm > 0);
    assert.ok(p.gravityMs2 > 0);
    assert.ok(p.cutoutUrl.length > 0);
    assert.ok(p.atmosphere.length > 0);
  }
});

test('orbital mechanics and gravity formulas match Earth and Jupiter baselines', () => {
  assert.equal(calculateKeplerPeriodYears(1.0), 1);
  assert.equal(calculateKeplerPeriodYears(5.2), 11.86);
  assert.equal(calculateOrbitalVelocityKmS(1.0), 29.78);
  assert.equal(calculateEscapeVelocityKmS(1.0, 1.0), 11.19);
  assert.equal(calculateSurfaceGravityG(1.0, 1.0), 1);
  const jupiterWeight = calculateWeightOnPlanet(70, PLANETS.jupiter.gravityMs2);
  assert.equal(jupiterWeight.newtons, 1735.3);
  assert.equal(jupiterWeight.earthEquivalentKg, 176.9);
});

test('tuition calculator computes Early Bird, student/educator discounts, and lab add-ons accurately', () => {
  const cohortStudent = calculateTuitionTotal({
    earlyBirdPrice: 149,
    standardPrice: 199,
    isEarlyBird: true,
    discountPercent: 15,
    addTelescopeLab: true,
  });
  assert.deepEqual(cohortStudent, {
    base: 149,
    discountAmount: 22,
    addOnAmount: 45,
    total: 172,
  });
});
