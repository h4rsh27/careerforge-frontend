import { useEffect, useMemo, useState } from "react";

import {
    createJobListing,
    deleteJobListing,
    getCompanies,
    getJobListings,
    getJobRoles,
    updateJobListing,
} from "../api/jobListingApi";

import JobListingForm from "../components/jobListings/JobListingForm";
import JobListingCard from "../components/jobListings/JobListingCard";

const emptyForm = {
    jobTitle: "",
    companyId: "",
    jobRoleId: "",
    location: "",
    salaryRange: "",
    experienceRequired: "",
    employmentType: "",
    applicationUrl: "",
};

const AdminJobListings = () => {

    const [listings, setListings] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [roles, setRoles] = useState([]);

    const [formData, setFormData] = useState(emptyForm);

    const [editingListing, setEditingListing] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [locationFilter, setLocationFilter] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadData = async () => {

        try {
            setLoading(true);
            setError("");

            const [
                listingsData,
                companiesData,
                rolesData,
            ] = await Promise.all([
                getJobListings(),
                getCompanies(),
                getJobRoles(),
            ]);

            setListings(listingsData || []);
            setCompanies(companiesData || []);
            setRoles(rolesData || []);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to load job listing data."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const filteredListings = useMemo(() => {

        const query =
            searchTerm.trim().toLowerCase();

        const location =
            locationFilter.trim().toLowerCase();

        return listings.filter((listing) => {

            const matchesSearch =
                !query ||
                listing.jobTitle
                    ?.toLowerCase()
                    .includes(query) ||
                listing.companyName
                    ?.toLowerCase()
                    .includes(query) ||
                listing.jobRole
                    ?.toLowerCase()
                    .includes(query);

            const matchesLocation =
                !location ||
                listing.location
                    ?.toLowerCase()
                    .includes(location);

            return (
                matchesSearch &&
                matchesLocation
            );
        });

    }, [
        listings,
        searchTerm,
        locationFilter,
    ]);

    const openCreateForm = () => {

        setEditingListing(null);
        setFormData(emptyForm);

        setShowForm(true);

        setError("");
        setSuccess("");
    };

    const openEditForm = (listing) => {

        setEditingListing(listing);

        setFormData({
            jobTitle: listing.jobTitle || "",
            companyId: listing.companyId || "",
            jobRoleId: listing.jobRoleId || "",
            location: listing.location || "",
            salaryRange: listing.salaryRange || "",
            experienceRequired:
                listing.experienceRequired || "",
            employmentType:
                listing.employmentType || "",
            applicationUrl:
                listing.applicationUrl || "",
        });

        setShowForm(true);

        setError("");
        setSuccess("");
    };

    const closeForm = () => {

        setShowForm(false);
        setEditingListing(null);
        setFormData(emptyForm);
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");
            setSuccess("");

            const payload = {
                jobTitle: formData.jobTitle.trim(),
                companyId: Number(formData.companyId),
                jobRoleId: Number(formData.jobRoleId),
                location: formData.location.trim(),
                salaryRange:
                    formData.salaryRange.trim(),
                experienceRequired:
                    formData.experienceRequired.trim(),
                employmentType:
                    formData.employmentType,
                applicationUrl:
                    formData.applicationUrl.trim(),
            };

            if (editingListing) {

                await updateJobListing(
                    editingListing.id,
                    payload
                );

                setSuccess(
                    "Job listing updated successfully."
                );

            } else {

                await createJobListing(payload);

                setSuccess(
                    "Job listing created successfully."
                );
            }

            closeForm();

            await loadData();

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to save job listing."
            );

        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Delete this job listing?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");
            setSuccess("");

            await deleteJobListing(id);

            setSuccess(
                "Job listing deleted successfully."
            );

            await loadData();

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to delete job listing."
            );
        }
    };

    return (
        <div className="admin-job-listings-page">

            <div className="admin-job-listings-background"></div>

            <div className="admin-job-listings-content">

                <section className="job-listings-header">

                    <div>

                        <span className="companies-eyebrow">
                            CAREERFORGE ADMIN
                        </span>

                        <h1>
                            Job Listings
                        </h1>

                        <p>
                            Publish real opportunities and
                            connect them with CareerForge
                            career roles.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="companies-add-button"
                        onClick={openCreateForm}
                    >
                        <span>+</span>
                        Add Job Listing
                    </button>

                </section>

                {error && (
                    <div className="companies-alert companies-alert-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="companies-alert companies-alert-success">
                        {success}
                    </div>
                )}

                {showForm && (
                    <section className="job-listing-form-panel">

                        <JobListingForm
                            formData={formData}
                            setFormData={setFormData}
                            companies={companies}
                            roles={roles}
                            onSubmit={handleSubmit}
                            onCancel={closeForm}
                            isEditing={
                                Boolean(editingListing)
                            }
                            loading={saving}
                        />

                    </section>
                )}

                <section className="job-listings-toolbar">

                    <div className="job-listings-count">

                        <strong>
                            {listings.length}
                        </strong>

                        <span>
                            {listings.length === 1
                                ? "job listing"
                                : "job listings"}
                        </span>

                    </div>

                    <div className="job-listing-filters">

                        <div className="job-listing-search">

                            <span>⌕</span>

                            <input
                                type="text"
                                placeholder="Search title, company or role..."
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(
                                        event.target.value
                                    )
                                }
                            />

                        </div>

                        <input
                            type="text"
                            className="job-location-filter"
                            placeholder="Filter location..."
                            value={locationFilter}
                            onChange={(event) =>
                                setLocationFilter(
                                    event.target.value
                                )
                            }
                        />

                    </div>

                </section>

                {loading ? (

                    <div className="companies-loading">

                        <div className="companies-spinner"></div>

                        <p>
                            Loading job listings...
                        </p>

                    </div>

                ) : filteredListings.length === 0 ? (

                    <section className="job-listings-empty">

                        <div className="job-listings-empty-icon">
                            {searchTerm || locationFilter
                                ? "⌕"
                                : "+"}
                        </div>

                        <h2>
                            {searchTerm || locationFilter
                                ? "No listings found"
                                : "No job listings yet"}
                        </h2>

                        <p>
                            {searchTerm || locationFilter
                                ? "Try changing your search or location filter."
                                : "Create your first job listing to start connecting students with real opportunities."}
                        </p>

                        {!searchTerm &&
                            !locationFilter && (
                                <button
                                    type="button"
                                    className="company-primary-button"
                                    onClick={openCreateForm}
                                >
                                    Create First Listing
                                </button>
                            )}

                    </section>

                ) : (

                    <section className="job-listings-grid">

                        {filteredListings.map(
                            (listing) => (
                                <JobListingCard
                                    key={listing.id}
                                    listing={listing}
                                    onEdit={
                                        openEditForm
                                    }
                                    onDelete={
                                        handleDelete
                                    }
                                />
                            )
                        )}

                    </section>
                )}

            </div>
        </div>
    );
};

export default AdminJobListings;