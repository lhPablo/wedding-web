import { describe, it, expect } from 'vitest';
import { generateClouds } from './cloudOverlay';

describe('generateClouds', () => {
  it('should generate default 80 clouds', () => {
    const clouds = generateClouds();
    expect(clouds).toHaveLength(80);
  });

  it('should generate specified number of clouds', () => {
    const clouds = generateClouds(50);
    expect(clouds).toHaveLength(50);
  });

  it('should generate zero clouds when count is 0', () => {
    const clouds = generateClouds(0);
    expect(clouds).toHaveLength(0);
  });

  it('should assign unique ids to each cloud', () => {
    const clouds = generateClouds(10);
    const ids = clouds.map(c => c.id);
    const uniqueIds = new Set(ids);
    
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should assign valid side to each cloud', () => {
    const validSides = ['left', 'right', 'top', 'bottom'];
    const clouds = generateClouds(100);
    
    clouds.forEach(cloud => {
      expect(validSides).toContain(cloud.side);
    });
  });

  it('should have all required style properties', () => {
    const clouds = generateClouds(10);
    
    clouds.forEach(cloud => {
      expect(cloud.style).toHaveProperty('--cloud-scale');
      expect(cloud.style).toHaveProperty('--cloud-pos');
      expect(cloud.style).toHaveProperty('--cloud-depth');
      expect(cloud.style).toHaveProperty('--cloud-delay');
      expect(cloud.style).toHaveProperty('--cloud-z');
    });
  });

  it('should generate scale values within range 1.5-3.5', () => {
    const clouds = generateClouds(100);
    
    clouds.forEach(cloud => {
      expect(cloud.style['--cloud-scale']).toBeGreaterThanOrEqual(1.5);
      expect(cloud.style['--cloud-scale']).toBeLessThanOrEqual(3.5);
    });
  });

  it('should generate z-index values within range 10-30', () => {
    const clouds = generateClouds(100);
    
    clouds.forEach(cloud => {
      expect(cloud.style['--cloud-z']).toBeGreaterThanOrEqual(10);
      expect(cloud.style['--cloud-z']).toBeLessThanOrEqual(30);
    });
  });
});
