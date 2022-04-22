module.exports = {
    testMatch: ["<rootDir>/src/**/*.test.ts"],
	testEnvironment: "node",
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.ts"],
	coverageDirectory: "coverage",
	coverageReporters: ["text", "lcov", "clover"],
	setupFiles: ["./jest-setup.ts"],
}