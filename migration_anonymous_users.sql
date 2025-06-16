-- Migration to make userId optional in Solution table for anonymous submissions
-- This migration should be applied to make the solution.userId field nullable

-- Note: This is a reference SQL. The actual migration should be generated using:
-- pnpm migrate

-- Expected change:
-- ALTER TABLE "Solution" ALTER COLUMN "userId" DROP NOT NULL;

-- This change allows anonymous users to submit solutions without being authenticated
-- The userId field will be NULL for anonymous submissions