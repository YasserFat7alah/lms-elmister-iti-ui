import { 
  FaDatabase, 
  FaShareAlt, 
  FaLock, 
  FaCookieBite, 
  FaUsers, 
  FaShieldAlt, 
  FaGlobe, 
  FaSyncAlt,
  FaFileAlt
} from 'react-icons/fa';
import PolicyHeader from '@/components/privacy/PolicyHeader';
import PolicySection from '@/components/privacy/PolicySection';
import PolicyList from '@/components/privacy/PolicyList';
import PolicyCard from '@/components/privacy/PolicyCard';
import TableOfContents from '@/components/privacy/TableOfContents';

const tocItems = [
  { id: 'information-collection', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'information-sharing', title: 'Information Sharing' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'cookies', title: 'Cookies & Tracking' },
  { id: 'your-rights', title: 'Your Rights' },
  { id: 'children-privacy', title: 'Children\'s Privacy' },
  { id: 'policy-changes', title: 'Policy Changes' },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <PolicyHeader
        title="Privacy Policy"
        lastUpdated="December 13, 2025"
        description="Your privacy is important to us. This policy explains how we collect, use, and protect your personal information."
      />

      {/* Quick Overview Cards */}
      <section className="container mx-auto px-4 -mt-8 relative z-10 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <PolicyCard icon={FaShieldAlt} title="Data Protection">
            We implement industry-standard security measures to protect your personal information.
          </PolicyCard>
          <PolicyCard icon={FaLock} title="Your Control">
            You have full control over your data with options to access, modify, or delete it.
          </PolicyCard>
          <PolicyCard icon={FaGlobe} title="Transparency">
            We're committed to being transparent about our data practices and your rights.
          </PolicyCard>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents items={tocItems} />
          </aside>

          {/* Content */}
          <main className="lg:col-span-3 space-y-8">
            <div className="bg-card border border-border rounded-xl p-6 md:p-10">
              
              <PolicySection id="information-collection" title="Information We Collect" icon={FaDatabase}>
                <p>
                  We collect information you provide directly to us, such as when you create an account, 
                  make a purchase, or contact us for support. This may include:
                </p>
                <PolicyList
                  variant="check"
                  items={[
                    'Name, email address, and contact information',
                    'Account credentials and profile information',
                    'Payment and billing information',
                    'Communication preferences and feedback',
                    'Device information and usage data',
                  ]}
                />
                <p className="mt-4">
                  We also automatically collect certain information when you use our services, including 
                  your IP address, browser type, operating system, and interaction data.
                </p>
              </PolicySection>

              <div className="border-t border-policy-divider my-8" />

              <PolicySection id="how-we-use" title="How We Use Your Information" icon={FaFileAlt}>
                <p>
                  We use the information we collect to provide, maintain, and improve our services. 
                  Specifically, we use your information to:
                </p>
                <PolicyList
                  variant="numbered"
                  items={[
                    'Process transactions and send related information',
                    'Send you technical notices, updates, and support messages',
                    'Respond to your comments, questions, and requests',
                    'Communicate about products, services, and events',
                    'Monitor and analyze trends, usage, and activities',
                    'Detect, investigate, and prevent fraudulent transactions',
                  ]}
                />
              </PolicySection>

              <div className="border-t border-policy-divider my-8" />

              <PolicySection id="information-sharing" title="Information Sharing" icon={FaShareAlt}>
                <p>
                  We do not sell your personal information. We may share your information only in 
                  the following circumstances:
                </p>
                <PolicyList
                  items={[
                    'With your consent or at your direction',
                    'With service providers who assist in our operations',
                    'To comply with legal obligations or protect rights',
                    'In connection with a merger, acquisition, or sale of assets',
                  ]}
                />
                <div className="mt-4 p-4 bg-policy-highlight rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> We require all third parties to respect the security of your 
                    personal data and treat it in accordance with the law.
                  </p>
                </div>
              </PolicySection>

              <div className="border-t border-policy-divider my-8" />

              <PolicySection id="data-security" title="Data Security" icon={FaLock}>
                <p>
                  We implement appropriate technical and organizational measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <PolicyList
                  variant="check"
                  items={[
                    'Encryption of data in transit and at rest',
                    'Regular security assessments and audits',
                    'Access controls and authentication measures',
                    'Employee training on data protection',
                    'Incident response procedures',
                  ]}
                />
              </PolicySection>

              <div className="border-t border-policy-divider my-8" />

              <PolicySection id="cookies" title="Cookies & Tracking Technologies" icon={FaCookieBite}>
                <p>
                  We use cookies and similar tracking technologies to collect and track information 
                  and to improve and analyze our service. You can instruct your browser to refuse 
                  all cookies or indicate when a cookie is being sent.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Required for the website to function properly. Cannot be disabled.
                    </p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Analytics Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                </div>
              </PolicySection>

              <div className="border-t border-policy-divider my-8" />

              <PolicySection id="your-rights" title="Your Rights" icon={FaUsers}>
                <p>
                  Depending on your location, you may have certain rights regarding your personal 
                  information, including:
                </p>
                <PolicyList
                  variant="check"
                  items={[
                    'Right to access your personal data',
                    'Right to rectification of inaccurate data',
                    'Right to erasure ("right to be forgotten")',
                    'Right to restrict processing',
                    'Right to data portability',
                    'Right to object to processing',
                    'Right to withdraw consent at any time',
                  ]}
                />
                <p className="mt-4">
                  To exercise any of these rights, please contact us using the information provided below.
                </p>
              </PolicySection>

              <div className="border-t border-policy-divider my-8" />

              <PolicySection id="children-privacy" title="Children's Privacy" icon={FaShieldAlt}>
                <p>
                  Our services are not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If you are a parent or guardian 
                  and believe your child has provided us with personal information, please contact us 
                  immediately.
                </p>
              </PolicySection>

              <div className="border-t border-policy-divider my-8" />

              <PolicySection id="policy-changes" title="Changes to This Policy" icon={FaSyncAlt}>
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes 
                  by posting the new privacy policy on this page and updating the "Last Updated" date.
                </p>
                <p>
                  You are advised to review this privacy policy periodically for any changes. Changes to 
                  this privacy policy are effective when they are posted on this page.
                </p>
              </PolicySection>

            </div>
          </main>
        </div>
      </div>

     
    </div>
  );
};

export default PrivacyPolicy;