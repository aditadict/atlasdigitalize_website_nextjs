"use client";

import React from "react";
import { companyInfo } from "@/lib/data";

// Base JSON-LD props
interface JsonLdProps {
  children?: React.ReactNode;
}

// Article Schema for blog posts/insights
interface ArticleJsonLdProps {
  title: string;
  description: string;
  image?: string | null;
  datePublished: string;
  dateModified: string;
  author?: string | null;
  section?: string | null;
  url: string;
  wordCount?: number;
}

export function ArticleJsonLd({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  section,
  url,
  wordCount,
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image || undefined,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      "@type": author ? "Person" : "Organization",
      name: author || companyInfo.name,
      url: author ? undefined : companyInfo.linkedin,
    },
    publisher: {
      "@type": "Organization",
      name: companyInfo.name,
      logo: {
        "@type": "ImageObject",
        url: `${typeof window !== "undefined" ? window.location.origin : ""}/images/atlas-digitalize-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: section || undefined,
    wordCount: wordCount || undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Organization Schema for the company
export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.name,
    alternateName: companyInfo.shortName,
    url: typeof window !== "undefined" ? window.location.origin : "",
    logo: `${typeof window !== "undefined" ? window.location.origin : ""}/images/atlas-digitalize-logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      contactType: "customer service",
      email: companyInfo.email,
      availableLanguage: ["English", "Indonesian"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address,
      addressCountry: "ID",
    },
    sameAs: [companyInfo.linkedin, companyInfo.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Breadcrumb Schema for navigation
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// WebPage Schema
interface WebPageJsonLdProps {
  title: string;
  description: string;
  url: string;
}

export function WebPageJsonLd({ title, description, url }: WebPageJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    publisher: {
      "@type": "Organization",
      name: companyInfo.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// FAQ Schema for FAQ pages
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  items: FAQItem[];
}

export function FAQJsonLd({ items }: FAQJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Service Schema for solutions/services
interface ServiceJsonLdProps {
  name: string;
  description: string;
  provider?: string;
  url: string;
}

export function ServiceJsonLd({
  name,
  description,
  provider,
  url,
}: ServiceJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    provider: {
      "@type": "Organization",
      name: provider || companyInfo.name,
    },
    url: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
