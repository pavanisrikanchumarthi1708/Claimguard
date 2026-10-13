package src;

import java.util.*;

public class ClaimGraph {

    private Map<String, List<String>> graph;

    public ClaimGraph() {
        graph = new HashMap<>();
    }

    public void addConnection(
            String claimant,
            String claimId) {

        graph
            .computeIfAbsent(
                claimant,
                key -> new ArrayList<>()
            )
            .add(claimId);
    }

    public int getClaimCount(
            String claimant) {

        if (!graph.containsKey(claimant)) {
            return 0;
        }

        return graph.get(claimant).size();
    }

    public void displayGraph() {

        System.out.println("\n--- Claimant-Claim Graph ---");

        for (String claimant : graph.keySet()) {

            System.out.println(
                claimant +
                " -> " +
                graph.get(claimant)
            );
        }
    }
}
