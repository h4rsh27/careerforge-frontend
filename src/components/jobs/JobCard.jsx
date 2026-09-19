import { useState } from "react";

import { createApplication } from "../../api/applicationApi";

const getMatchClass = (percentage) => {
    if (percentage >= 85) {
        return "high";
    }

    if (percentage >= 70) {
        return "recommended";
    }

    if (percentage >= 50) {
        return "possible";
    }

    return "low";
};

const JobCard = ({
    job,
    onViewBreakdown,
}) => {

    const matchClass = getMatchClass(
        job.matchPercentage
    );

    const [saving, setSaving] =
        useState(false);

    const [saved, setSaved] =
        useState(false);

    const [saveError, setSaveError] =
        useState("");

    const handleSaveApplication =
        async () => {

            try {

                setSaving(true);
                setSaveError("");

                await createApplication(
                    job.jobListingId,
                    "SAVED"
                );

                setSaved(true);

            } catch (err) {

                const message =
                    err.response?.data?.message ||
                    "Unable to save this opportunity.";

                setSaveError(message);

            } finally {

                setSaving(false);

            }
        };


    return (
        <article className="job-card">

            <div className="job-card-top">

                <div className="company-avatar">
                    {(
                        job.companyName ||
                        "C"
                    )
                        .charAt(0)
                        .toUpperCase()}
                </div>

                <div className="job-card-match">

                    <div
                        className={`job-match-ring ${matchClass}`}
                        style={{
                            "--match":
                                `${job.matchPercentage}%`,
                        }}
                    >
                        <span>
                            {Math.round(
                                job.matchPercentage
                            )}
                        </span>

                        <small>
                            %
                        </small>

                    </div>

                </div>

            </div>


            <div className="job-card-company">
                {job.companyName ||
                    "Company"}
            </div>


            <h2>
                {job.jobTitle ||
                    "Untitled Position"}
            </h2>


            <div className="job-role">

                <span>
                    ◆
                </span>

                {job.jobRole ||
                    "General Position"}

            </div>


            <div className="job-details">

                {job.location && (
                    <span>
                        <i>⌖</i>
                        {job.location}
                    </span>
                )}

                {job.employmentType && (
                    <span>
                        <i>◷</i>
                        {job.employmentType}
                    </span>
                )}

                {job.experienceRequired !==
                    null &&
                    job.experienceRequired !==
                        undefined && (
                        <span>
                            <i>◇</i>
                            {job.experienceRequired}
                        </span>
                    )}

            </div>


            {job.salaryRange && (
                <div className="job-salary">

                    <span>
                        Compensation
                    </span>

                    <strong>
                        {job.salaryRange}
                    </strong>

                </div>
            )}


            <div className="job-card-divider"></div>


            {saveError && (
                <div className="job-save-error">
                    {saveError}
                </div>
            )}


            <div className="job-card-footer">

                <span
                    className={`job-recommendation-badge ${matchClass}`}
                >
                    {job.recommendationLevel ||
                        "MATCH"}
                </span>


                <div className="job-card-buttons">

                    <button
                        type="button"
                        className="job-breakdown-button"
                        onClick={() =>
                            onViewBreakdown(job)
                        }
                    >
                        Match Details
                    </button>


                    {!saved ? (

                        <button
                            type="button"
                            className="job-save-button"
                            onClick={
                                handleSaveApplication
                            }
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Job"}
                        </button>

                    ) : (

                        <span className="job-saved-button">
                            ✓ Saved
                        </span>

                    )}


                    {job.applicationUrl && (
                        <a
                            href={
                                job.applicationUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="job-apply-button"
                        >
                            Apply →
                        </a>
                    )}

                </div>

            </div>

        </article>
    );
};

export default JobCard;