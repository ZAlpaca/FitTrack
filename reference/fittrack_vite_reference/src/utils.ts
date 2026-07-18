/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Calculates the stroke dashoffset for concentric progress rings
 * @param percent percentage completed (0 to 100)
 * @param radius radius of the progress circle path
 */
export const calculateStrokeDashOffset = (percent: number, radius: number): number => {
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(100, Math.max(0, percent));
  return circumference - (clampedPercent / 100) * circumference;
};
