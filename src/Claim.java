package src;

public class Claim {

    private String claimId;
    private String claimant;
    private String policyId;
    private double claimAmount;
    private double previousAverage;
    private double riskScore;

    public Claim(
            String claimId,
            String claimant,
            String policyId,
            double claimAmount,
            double previousAverage) {

        this.claimId = claimId;
        this.claimant = claimant;
        this.policyId = policyId;
        this.claimAmount = claimAmount;
        this.previousAverage = previousAverage;
        this.riskScore = 0;
    }

    public String getClaimId() {
        return claimId;
    }

    public String getClaimant() {
        return claimant;
    }

    public String getPolicyId() {
        return policyId;
    }

    public double getClaimAmount() {
        return claimAmount;
    }

    public double getPreviousAverage() {
        return previousAverage;
    }

    public double getRiskScore() {
        return riskScore;
    }

    public void setRiskScore(double riskScore) {
        this.riskScore = riskScore;
    }

    public String toCSV() {

        return claimId + "," +
                claimant + "," +
                policyId + "," +
                claimAmount + "," +
                previousAverage;
    }
}