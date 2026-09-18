import { useEffect, useMemo, useState } from "react";

import {
    createCompany,
    deleteCompany,
    getCompanies,
    updateCompany,
} from "../api/companyApi";

import CompanyForm from "../components/companies/CompanyForm";
import CompanyCard from "../components/companies/CompanyCard";
const AdminCompanies = () => {
    const [companies, setCompanies] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [formLoading, setFormLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [showForm, setShowForm] =
        useState(false);

    const [editingCompany, setEditingCompany] =
        useState(null);

    const [search, setSearch] =
        useState("");

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getCompanies();

            setCompanies(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to load companies."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (companyData) => {
        try {
            setFormLoading(true);
            setError("");
            setMessage("");

            const created =
                await createCompany(
                    companyData
                );

            setCompanies((current) => [
                ...current,
                created,
            ]);

            setShowForm(false);

            setMessage(
                "Company created successfully."
            );

        } catch (error) {
            const backendError =
                error.response?.data;

            setError(
                typeof backendError ===
                    "string"
                    ? backendError
                    : backendError?.message ||
                      "Unable to create company."
            );
        } finally {
            setFormLoading(false);
        }
    };

    const handleUpdate = async (
        companyData
    ) => {
        try {
            setFormLoading(true);
            setError("");
            setMessage("");

            const updated =
                await updateCompany(
                    editingCompany.id,
                    companyData
                );

            setCompanies((current) =>
                current.map((company) =>
                    company.id ===
                    updated.id
                        ? updated
                        : company
                )
            );

            setEditingCompany(null);
            setShowForm(false);

            setMessage(
                "Company updated successfully."
            );

        } catch (error) {
            const backendError =
                error.response?.data;

            setError(
                typeof backendError ===
                    "string"
                    ? backendError
                    : backendError?.message ||
                      "Unable to update company."
            );
        } finally {
            setFormLoading(false);
        }
    };

    const handleSubmit = async (
        companyData
    ) => {
        if (editingCompany) {
            await handleUpdate(
                companyData
            );
        } else {
            await handleCreate(
                companyData
            );
        }
    };

    const handleEdit = (company) => {
        setError("");
        setMessage("");

        setEditingCompany(company);
        setShowForm(true);
    };

    const handleDelete = async (
        company
    ) => {
        const confirmed = window.confirm(
            `Delete "${company.name}"? This action cannot be undone.`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");
            setMessage("");

            await deleteCompany(
                company.id
            );

            setCompanies((current) =>
                current.filter(
                    (item) =>
                        item.id !==
                        company.id
                )
            );

            setMessage(
                "Company deleted successfully."
            );

        } catch (error) {
            const backendError =
                error.response?.data;

            setError(
                typeof backendError ===
                    "string"
                    ? backendError
                    : backendError?.message ||
                      "Unable to delete company."
            );
        }
    };

    const handleAddCompany = () => {
        setEditingCompany(null);
        setError("");
        setMessage("");
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setEditingCompany(null);
        setShowForm(false);
        setError("");
    };

    const filteredCompanies =
        useMemo(() => {
            const query =
                search
                    .trim()
                    .toLowerCase();

            if (!query) {
                return companies;
            }

            return companies.filter(
                (company) =>
                    company.name
                        ?.toLowerCase()
                        .includes(query) ||
                    company.location
                        ?.toLowerCase()
                        .includes(query)
            );
        }, [companies, search]);

    return (
        <main className="admin-companies-page">

            <div className="admin-companies-background"></div>

            <div className="admin-companies-content">

                <section className="companies-header">

                    <div>
                        <span className="companies-eyebrow">
                            CAREERFORGE / EMPLOYER NETWORK
                        </span>

                        <h1>
                            Companies
                        </h1>

                        <p>
                            Manage the companies that
                            power CareerForge job
                            opportunities.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="companies-add-button"
                        onClick={
                            handleAddCompany
                        }
                    >
                        <span>+</span>
                        Add company
                    </button>

                </section>

                {(error || message) && (
                    <div
                        className={
                            error
                                ? "companies-alert companies-alert-error"
                                : "companies-alert companies-alert-success"
                        }
                    >
                        <span>
                            {error ? "!" : "✓"}
                        </span>

                        <p>
                            {error || message}
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setError("");
                                setMessage("");
                            }}
                        >
                            ×
                        </button>
                    </div>
                )}

                {showForm && (
                    <section className="company-form-panel">
                        <CompanyForm
                            company={
                                editingCompany
                            }
                            onSubmit={
                                handleSubmit
                            }
                            onCancel={
                                handleCancelForm
                            }
                            loading={
                                formLoading
                            }
                        />
                    </section>
                )}

                <section className="companies-toolbar">

                    <div>
                        <span>
                            {companies.length}
                        </span>

                        {companies.length ===
                        1
                            ? " company"
                            : " companies"}
                    </div>

                    <div className="company-search">

                        <span>⌕</span>

                        <input
                            type="search"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target
                                        .value
                                )
                            }
                            placeholder="Search companies..."
                        />

                    </div>

                </section>

                {loading ? (
                    <div className="companies-loading">

                        <div className="companies-spinner"></div>

                        <h2>
                            Loading companies
                        </h2>

                        <p>
                            Fetching employer
                            information...
                        </p>

                    </div>
                ) : filteredCompanies.length ===
                  0 ? (
                    <div className="companies-empty">

                        <div className="companies-empty-icon">
                            ▣
                        </div>

                        <h2>
                            {companies.length ===
                            0
                                ? "No companies yet"
                                : "No matching companies"}
                        </h2>

                        <p>
                            {companies.length ===
                            0
                                ? "Add your first company to start building the CareerForge job marketplace."
                                : "Try a different company name or location."}
                        </p>

                        {companies.length ===
                            0 && (
                            <button
                                type="button"
                                className="companies-add-button"
                                onClick={
                                    handleAddCompany
                                }
                            >
                                <span>+</span>
                                Add first company
                            </button>
                        )}

                    </div>
                ) : (
                    <section className="companies-grid">

                        {filteredCompanies.map(
                            (company) => (
                                <CompanyCard
                                    key={
                                        company.id
                                    }
                                    company={
                                        company
                                    }
                                    onEdit={
                                        handleEdit
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

        </main>
    );
};

export default AdminCompanies;