package src;

public class RationalAgent {

    public boolean flagClaim(
            Claim claim,
            ClaimGraph graph) {

        double amount = claim.getClaimAmount();

        double previous = claim.getPreviousAverage();

        int connections = graph.getClaimCount(
                claim.getClaimant()
        );

        // Rational-agent decision rules

        if (previous > 0 && amount > previous * 2.5) {
            return true;
        }

        if (connections >= 3) {
            return true;
        }

        return false;
    }
}