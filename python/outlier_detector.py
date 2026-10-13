import csv
import os


INPUT_FILE = "data/claims.csv"
OUTPUT_FILE = "data/scored_claims.csv"


def calculate_score(claim_amount, previous_average):
    """
    Calculate a simple fraud-likelihood score
    based on claim amount compared with policy history.
    """

    if previous_average <= 0:
        return 50.0

    ratio = claim_amount / previous_average

    if ratio >= 4:
        score = 95
    elif ratio >= 3:
        score = 85
    elif ratio >= 2.5:
        score = 75
    elif ratio >= 2:
        score = 60
    elif ratio >= 1.5:
        score = 40
    elif ratio >= 1:
        score = 20
    else:
        score = 10

    return float(score)


def get_risk(score):
    if score >= 80:
        return "HIGH"
    elif score >= 50:
        return "MEDIUM"
    else:
        return "LOW"


def process_claims():

    if not os.path.exists(INPUT_FILE):
        print("ERROR: claims.csv not found.")
        print("Run the Java application first.")
        return

    results = []

    with open(
        INPUT_FILE,
        "r",
        newline="",
        encoding="utf-8"
    ) as file:

        reader = csv.DictReader(file)

        for row in reader:

            claim_amount = float(
                row["claim_amount"]
            )

            previous_average = float(
                row["previous_average"]
            )

            score = calculate_score(
                claim_amount,
                previous_average
            )

            risk = get_risk(score)

            row["fraud_score"] = f"{score:.1f}"
            row["risk_level"] = risk

            results.append(row)

    # Sort highest fraud score first
    results.sort(
        key=lambda row: float(row["fraud_score"]),
        reverse=True
    )

    os.makedirs(
        os.path.dirname(OUTPUT_FILE),
        exist_ok=True
    )

    fieldnames = [
        "claim_id",
        "claimant",
        "policy_id",
        "claim_amount",
        "previous_average",
        "fraud_score",
        "risk_level"
    ]

    with open(
        OUTPUT_FILE,
        "w",
        newline="",
        encoding="utf-8"
    ) as file:

        writer = csv.DictWriter(
            file,
            fieldnames=fieldnames
        )

        writer.writeheader()
        writer.writerows(results)

    print()
    print("==========================================")
    print("          CLAIMGUARD PYTHON ENGINE")
    print("==========================================")
    print()

    print("Outlier detection completed.")
    print(f"Processed claims : {len(results)}")
    print(f"Output file      : {OUTPUT_FILE}")
    print()

    print("Risk-ranked claims:")

    for row in results:

        print(
            f"{row['claim_id']} | "
            f"{row['risk_level']} | "
            f"{row['fraud_score']}"
        )

    print()
    print("Python processing completed successfully.")


if __name__ == "__main__":
    process_claims()