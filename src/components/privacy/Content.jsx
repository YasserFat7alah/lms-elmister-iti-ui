export function Content() {
  return (
    <div className="bg-card border border-border rounded-lg p-8 md:p-12">
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: January 2024
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          1. Information We Collect
        </h2>
        <div className="text-muted-foreground space-y-3 leading-relaxed">
          <p>
            We collect information you provide directly to us, including name,
            email address, phone number, and any other information you choose to
            provide.
          </p>
          <p>
            This may include your IP address, browser type, operating system,
            referring URLs, and information about your usage of our services.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          2. How We Use Your Information
        </h2>
        <div className="text-muted-foreground space-y-3 leading-relaxed">
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          3. Information Sharing
        </h2>
        <div className="text-muted-foreground space-y-3 leading-relaxed">
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information only in the following
            circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and prevent fraud</li>
            <li>With service providers who assist our operations</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          4. Data Security
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          5. Cookies and Tracking
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We use cookies and similar tracking technologies to track activity on
          our service and hold certain information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          6. Your Rights
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your information</li>
          <li>Withdraw consent at any time</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          7. Children's Privacy
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Our services are not intended for children under 13 years of age.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          8. Third-Party Links
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Our service may contain links to third-party websites. We are not
          responsible for their privacy practices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          9. Changes to This Policy
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          We may update this Privacy Policy from time to time.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          10. Contact Us
        </h2>
        <p className="text-muted-foreground">Email: privacy@example.com</p>
        <p className="text-muted-foreground">Phone: (555) 123-4567</p>
      </section>
    </div>
  )
}
