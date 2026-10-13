package src;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

public class ClaimProcessor {

    public void exportClaims(
            List<Claim> claims,
            String filePath) {

        try (FileWriter writer =
                new FileWriter(filePath)) {

            writer.write(
                "claim_id,claimant,policy_id," +
                "claim_amount,previous_average\n"
            );

            for (Claim claim : claims) {

                writer.write(
                    claim.toCSV() + "\n"
                );
            }

            System.out.println(
                "\nClaims exported successfully."
            );

            System.out.println(
                "File: " + filePath
            );

        } catch (IOException e) {

            System.out.println(
                "Error while exporting claims."
            );

            e.printStackTrace();
        }
    }
}