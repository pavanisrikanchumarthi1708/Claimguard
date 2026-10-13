package src;

import java.util.*;

public class Main {

    public static void main(String[] args) {

        System.out.println(
            "=========================================="
        );

        System.out.println(
            "          CLAIMGUARD"
        );

        System.out.println(
            " Insurance Claim Fraud Scout"
        );

        System.out.println(
            "=========================================="
        );


        /*
         * Create claims
         */

        List<Claim> claims =
                new ArrayList<>();


        claims.add(
            new Claim(
                "C-0017",
                "Ramesh Kumar",
                "P-55421",
                500000,
                150000
            )
        );

        claims.add(
            new Claim(
                "C-0032",
                "Anjali Sharma",
                "P-66234",
                375000,
                140000
            )
        );

        claims.add(
            new Claim(
                "C-0041",
                "Vikram Singh",
                "P-77891",
                210000,
                170000
            )
        );

        claims.add(
            new Claim(
                "C-0055",
                "Neha Patel",
                "P-88903",
                185000,
                90000
            )
        );

        claims.add(
            new Claim(
                "C-0067",
                "Suresh Babu",
                "P-90123",
                95000,
                100000
            )
        );

        claims.add(
            new Claim(
                "C-0078",
                "Priya Nair",
                "P-91452",
                280000,
                100000
            )
        );


        /*
         * Create Claim Graph
         */

        ClaimGraph graph =
                new ClaimGraph();


        for (Claim claim : claims) {

            graph.addConnection(
                claim.getClaimant(),
                claim.getClaimId()
            );
        }


        /*
         * Display graph
         */

        graph.displayGraph();


        /*
         * Rational Agent
         */

        RationalAgent agent =
                new RationalAgent();


        System.out.println(
            "\n--- Rational Agent Analysis ---"
        );


        for (Claim claim : claims) {

            boolean flagged =
                    agent.flagClaim(
                        claim,
                        graph
                    );


            if (flagged) {

                System.out.println(
                    claim.getClaimId() +
                    " -> FLAGGED"
                );

            } else {

                System.out.println(
                    claim.getClaimId() +
                    " -> NORMAL"
                );
            }
        }


        /*
         * Export data for Python
         */

        ClaimProcessor processor =
                new ClaimProcessor();


        processor.exportClaims(
            claims,
            "data/claims.csv"
        );


        System.out.println(
            "\nNext step:"
        );

        System.out.println(
            "Run Python outlier detector."
        );

        System.out.println(
            "=========================================="
        );
    }
}