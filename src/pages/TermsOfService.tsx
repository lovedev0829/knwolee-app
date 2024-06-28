import { Button, Checkbox, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import KnowleeLogoBig from "../Icons/KnowleeLogoBig";
import {
  useUpdateProfileMutation,
  useUpdateUserSettingMutation,
} from "../api/mutations/userIndex";
import { useUserData, useUserSetting } from "../api/queries";
import { useAuth0 } from "@auth0/auth0-react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const hCaptchaSiteKey = import.meta.env.VITE_APP_HCAPTCHA_SITE_KEY as string;
const TOS_SECTIONS = {
  TOS: "TOS",
  PP: "PP",
  MARKETING: "MARKETING",
} as const;

type TosSection = (typeof TOS_SECTIONS)[keyof typeof TOS_SECTIONS];

const customScrollbar = {
  "&::-webkit-scrollbar": {
    width: "4px",
    marginLeft: "28px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "primary.50",
    borderRadius: "5px",
  },
};

const TermsOfService: React.FC = () => {
  const { data: userSetting } = useUserSetting();
  const { data: userData } = useUserData();
  const updateProfileMutation = useUpdateProfileMutation();
  const updateSettingMutation = useUpdateUserSettingMutation();

  const { logout } = useAuth0();

  const tosRef = useRef(null);
  const ppRef = useRef(null);
  const marketingRef = useRef(null);

  const [isCaptchaSolved, setIsCaptchaSolved] = useState<boolean>(false);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          switch (entry.target) {
            case tosRef.current:
              setSelectedSection(TOS_SECTIONS.TOS);
              break;
            case ppRef.current:
              setSelectedSection(TOS_SECTIONS.PP);
              break;
            case marketingRef.current:
              setSelectedSection(TOS_SECTIONS.MARKETING);
              break;
            default:
              break;
          }
        }
      });
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (tosRef.current) observer.observe(tosRef.current);
    if (ppRef.current) observer.observe(ppRef.current);
    if (marketingRef.current) observer.observe(marketingRef.current);

    return () => {
      if (tosRef.current) observer.unobserve(tosRef.current);
      if (ppRef.current) observer.unobserve(ppRef.current);
      if (marketingRef.current) observer.unobserve(marketingRef.current);
    };
  }, []);

  const [selectedSection, setSelectedSection] = useState<TosSection>(
    TOS_SECTIONS.TOS
  );

  const [hasAcceptedTosPp, setHasAcceptedTosPp] = useState<boolean>(false);
  const [hasAcceptedMktg, setHasAcceptedMktg] = useState<boolean>(false);

  const isSectionViewed = (section: TosSection) => {
    return section === selectedSection;
  };

  const updateUser = () => {
    if (!userSetting) {
      void logout({ logoutParams: { returnTo: window.location.origin } });
      return;
    }
    const formData = new FormData();
    formData.append("hasAcceptedTosPp", String(true));
    updateProfileMutation.mutate(formData);

    updateSettingMutation.mutate({
      ...userSetting,
      notification: {
        ...userSetting.notification,
        emailSpecialOffersAndPromotions: hasAcceptedMktg,
      },
    });
  };

  const handleSubmit = () => {
    if (!hasAcceptedTosPp) {
      return;
    }
    updateUser();

    // Push event to GTM data layer
    window.dataLayer.push({
      event: 'signupEvent',
      email: userData?.email
    });
  };

  function onHCaptchaChange(token: string | null) {
    setIsCaptchaSolved(token !== null);
  }

  const isLoading = updateProfileMutation.isLoading;

  return (
    <Flex w="100%" bg="white">
      <Flex
        w="450px"
        boxShadow="8px 0px 15px rgba(0, 0, 0, 0.1)"
        flexDir="column"
        px="40px"
      >
        <Flex
          w="100%"
          mb="50px"
          mt="80px"
          justifyContent="center"
          alignItems="center"
        >
          <KnowleeLogoBig width="90" height="90" />
        </Flex>
        <Text
          py="8px"
          fontSize="18px"
          fontWeight={isSectionViewed(TOS_SECTIONS.TOS) ? "600" : "400"}
          color={
            isSectionViewed(TOS_SECTIONS.TOS) ? "neutral.100" : "neutral.50"
          }
        >
          1 Terms & Conditions
        </Text>
        <Text
          py="8px"
          fontSize="18px"
          fontWeight={isSectionViewed(TOS_SECTIONS.PP) ? "600" : "400"}
          color={
            isSectionViewed(TOS_SECTIONS.PP) ? "neutral.100" : "neutral.50"
          }
        >
          2 Privacy Policy
        </Text>
      </Flex>
      <Flex flexDir="column" w="100%" pl="150px">
        <Flex
          flexDir="column"
          mt="50px"
          mb="50px"
          maxW="750px"
          w="100%"
          minH={0}
          flex="1"
        >
          <Heading color="neutral.100" mb="90px">
            Terms Of Service
          </Heading>
          <Flex
            className="scroll-hover"
            flexDir="column"
            overflowY="auto"
            pr="48px"
            sx={customScrollbar}
          >
            {mockTermsOfService.map((s, index) => (
              <>
                <Text
                  color="neutral.100"
                  fontWeight={600}
                  fontSize="22px"
                  py="18px"
                  ref={
                    index === 0 ? tosRef :
                      index === 1 ? ppRef :
                        marketingRef
                  }
                >
                  {s.title}
                </Text>
                <Text color="neutral.70">
                  {s.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </Text>
              </>
            ))}
          </Flex>

          <Flex flexDir="column" gap="8px" mt="16px">
            <Flex color="white">
              <Text fontWeight="500" color="neutral.100">
                I accept {' '}
                <a href="https://www.knowlee.ai/terms.html" target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>Terms & Conditions</a>
                {' '}and {' '}
                <a href="https://www.knowlee.ai/privacy.html" target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</a>
              </Text>
              <Checkbox
                borderColor="neutral.70"
                ml={2}
                isChecked={hasAcceptedTosPp}
                onChange={() => setHasAcceptedTosPp((prev) => !prev)}
              />
            </Flex>
            <Flex>
              <Text color="neutral.100" fontWeight="300">
                Please keep me posted on Knowlee news, events and offers.
              </Text>
              <Checkbox
                borderColor="neutral.70"
                ml={2}
                isChecked={hasAcceptedMktg}
                onChange={() => setHasAcceptedMktg((prev) => !prev)}
              />
            </Flex>
            <Text color="neutral.100" fontWeight="300">
              Solve the Captcha below:
            </Text>
            <HCaptcha
              sitekey={hCaptchaSiteKey}
              onVerify={onHCaptchaChange}
            />
          </Flex>

          <Flex w="100%" mt="50px" p="8px" gap="8px">
            <Button
              color="white"
              bg="#4386F4"
              borderRadius="50px"
              padding="8px 20px"
              fontSize="16px"
              fontWeight="500"
              _hover={{}}
              _active={{}}
              onClick={handleSubmit}
              w="100%"
              isDisabled={
                isLoading ||
                !hasAcceptedTosPp ||
                updateSettingMutation.isLoading ||
                !isCaptchaSolved
              }
              isLoading={isLoading || updateSettingMutation.isLoading}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};


const mockTermsOfService = [
  {
    title: "1. Terms of service",
    content: `Terms of Service for Knowlee

    Thank you for choosing Knowlee!
    
    These Terms of Service ("Terms") apply when you use the services of Knowlee, Inc. or our affiliates, including our application programming interface, software, tools, developer services, data, documentation, and websites ("Services"). The Terms include our Service Terms, Sharing & Publication Policy, Usage Policies, and other documentation, guidelines, or policies we may provide in writing. By using our Services, you agree to these Terms. Our Privacy Policy explains how we collect and use personal information.
    
    1. Registration and Access
    • Eligibility: You must be at least 13 years old to use Knowlee. If under 18, you need permission from a parent or legal guardian. You represent either yourself or the entity you're authorized to act on behalf of. Accurate information is required for registration. Sharing access outside your organization is prohibited. You are liable for activities under your account.
    
    2. Usage Requirements
    • Service Use: Access is granted non-exclusively as per these Terms. Abide by all applicable laws. All rights in Knowlee remain with us.
    • Feedback: Feedback and suggestions are welcomed. Knowlee has the right to use any feedback without any obligations to you.
    • Restrictions: Do not misuse, reverse engineer, or violate the services in any manner. Adhere to provided guidelines and only use the Services where supported.
    • Third-Party Services: We aren't responsible for third-party products or services you employ.
    
    3. Content
    • Ownership: You own the data you provide ("Input"). Knowlee grants you rights to the output generated ("Output"). Content should not violate laws or these terms.
    • Similarity: Outputs might resemble those given to other users.
    • Accuracy: Knowlee seeks to improve continually. Users should independently verify the accuracy of outputs.
    
    4. Fees and Payments
    • Billing: Abide by listed pricing or as agreed upon. Provide accurate billing information. We can rectify billing errors.
    • Taxes: All taxes associated with the services are your responsibility.
    • Price Alterations: Notice will be provided for any price changes.
    • Billing Issues: Discrepancies should be reported promptly.
    • Free Access: Multiple accounts to exploit free access are prohibited.
    
    5. Confidentiality, Security, and Data Protection
    • Confidentiality: Respect the confidentiality of any non-public information accessed through Knowlee.
    • Security: Ensure safe usage of Knowlee. Report any vulnerabilities.
    • Data Processing: Adhere to data protection laws if processing personal data.
    
    6. Term and Termination
    • Endings: These terms begin on first use and last until termination. Non-compliance might result in termination or suspension.
    • Post-Termination: On termination, cease use and return or destroy confidential information.
    
    7. Liabilities and Warranties
    • Indemnity: Protect us from claims arising from your misuse.
    • Disclaimer: Knowlee is provided "as is". No warranties are guaranteed beyond what's mandated by law.
    
    8. Social Media, Livestreaming, and Demonstrations
    To mitigate the possible risks of AI-generated content, we have set the following policy on permitted sharing:
    • Social Media Posting: Posting your own prompts or completions to social media is generally permissible.
    • Livestreaming and Demonstrations: Livestreaming your usage or demonstrating our products to groups of people is allowed.
    • Guidelines:
      • Manually review each generation before sharing or while streaming.
      • Attribute the content to your name or your company.
      • Indicate that the content is AI-generated in a way no user could reasonably miss or misunderstand.
      • Do not share content that violates our Content Policy or that may offend others.
      • Use good judgment if taking audience requests for prompts; avoid inputs that might result in violations of our Content Policy.
      • To ensure the Knowlee team is aware of a particular completion, you may email us or use the reporting tools within the platform.
      • Recall that you are interacting with the raw model, which means we do not filter out biased or negative responses.
    
    9. Content Co-Authored with Knowlee
    Creators who wish to publish their first-party written content (e.g., a book, compendium of short stories) created in part with Knowlee are permitted to do so under the following conditions:
    • Attribution: The published content is attributed to your name or company.
    • Disclosure: The role of AI in formulating the content is clearly disclosed in a way that no reader could possibly miss.
    • Compliance: Topics of the content do not violate Knowlee’s Content Policy or Terms of Use.
    • Responsibility: A human must take ultimate responsibility for the content being published.
    
    Here is some stock language you may use to describe your creative process, provided it is accurate:
    • The author generated this text in part with Knowlee, an AI-powered content creation tool. Upon generating draft language, the author reviewed, edited, and revised the language to their own liking and takes ultimate responsibility for the content of this publication.
    
    10. Service Credit Terms
    These Knowlee Service Credit Terms (“Terms”) are an agreement between you and Knowlee, Inc. (or our affiliates) and govern your purchase, receipt, or use of any credit redeemable for our Services (“Service Credit”). 
    • Prepaid Service Credits: Prepaid Service Credits represent the amount you have paid in advance for use of the respective Services.
    • Promo Service Credits: Promo Service Credits will not be applied against any sales, use, gross receipts, or similar transaction-based taxes.
    • Non-Monetary Value: Service Credits are not legal tender or currency and are non-transferable.
    • Expiration and Balance: Service Credits expire one year after the date of purchase or issuance if not used. Your available Service Credit balance may be reviewed in your Knowlee account.
    • Prohibited Actions: Any attempt to use, sell, or transfer Service Credits in violation of these Terms may result in revocation, termination, or cancellation of the Service Credits and/or your use of the Services.
    
    11. General Terms
    • Assignment: You may not assign or transfer any rights or obligations under these Terms. We may assign or transfer our rights or obligations to any affiliate or subsidiary.
    • Changes to Terms or Services: We may update these Terms or our Services from time to time. We will give you at least 30 days' notice of changes that materially impact you.
    • Trade Controls: You must comply with all applicable trade laws, including sanctions and export control laws.
    • Governing Law: The law of the jurisdiction where you are a resident will govern these Terms.
    
    12. Dispute Resolution
    • Concerns: If we have a dispute, we would first like to address your concerns before any formal legal action.
    • Court: If we cannot resolve our dispute, you or we can go to your local courts.
    
    13. Contact Information
    • Copyright Complaints: If you believe that your intellectual property rights have been infringed, please contact us.
    `,
  },
  {
    title: "2. Privacy Policy",
    content: `Privacy Policy for Knowlee

    We at Knowlee, Inc. ("Knowlee," "we," "us," or "our") prioritize your privacy and are committed to protecting any information we gather from or about you. This Privacy Policy explains our practices regarding Personal Information we collect when you utilize our platforms, tools, and services ("Services"). This policy does not pertain to content we handle on behalf of our business clients; such content is guided by agreements with those specific clients.

For detailed insights on how we gather and use training data to develop our AI models and your choices regarding this, please refer to our designated help center article.

1. Personal Information We Collect
• Information You Provide:
  • Account Information: During account creation, we gather details like name, contact data, account passwords, payment methods, and transaction records.
  • User Input: We collect data you input, upload, or give feedback on while using our Services.
  • Communication Info: If you get in touch with us, we collect your contact details and message contents.
  • Social Media Interactions: Your interactions on our social media profiles may provide us with information you choose to share.

• Automatically Collected Info:
  • Log Data: Information automatically shared by your browser, like IP address, browser type, the date/time of your interaction, and your site activity.
  • Usage Info: Data regarding how you engage with our Services, such as content types, actions, time zones, access timings, device types, and connection data.
  • Device Details: Information about your device, its OS, and browser.
  • Cookies: We utilize cookies to enhance our Services. You can control cookie settings via your browser.
  • Analytics: Tools to help understand how users engage with our Services.

2. Usage of Personal Information
• For Service provision, analysis, and maintenance.
• Service improvements and research.
• Communication with users.
• New product/service development.
• Fraud prevention and securing our IT systems.
• Legal obligations and rights protection.
• We might aggregate or anonymize Personal Information so it cannot identify you. This data helps us improve our Services, research, and share aggregated stats. We don’t attempt to de-anonymize this data unless legally mandated.

Knowlee does not use any collected data to train AI models.

3. Disclosure of Personal Information
• Vendors/Service Providers: For business needs, we might share data with third-party service providers like hosting services, IT services, and email tools.
• Business Transfers: During business transactions or mergers, your data may be shared and transferred to a succeeding entity.
• Legal Requirements: In legal circumstances, we might disclose your data.
• Affiliates: Our affiliate entities might access the data, consistent with this Privacy Policy.

4. Your Rights
• Depending on your jurisdiction, you might have the right to access, rectify, delete, transfer, restrict, or object to our data processing.
• Exercise your rights via your Knowlee account or contact knowlee.ai@gmail.com.
  
If our models inaccurately present information about you, reach out to knowlee.ai@gmail.com for corrections. Complete removal might not be feasible technically, but you can request Personal Information removal from our output using this form.

5. Additional U.S. State Disclosures
• We provide details about Personal Information categories we collect, their purpose, and who they are disclosed to. Review above sections for details.
• Privacy rights are subject to local laws, and we don’t sell or use your data for targeted advertising. Specific privacy rights can be exercised via knowlee.ai@gmail.com.
  
Verification may be needed to secure your data. If you cannot verify your identity, we cannot fulfill your request.

6. Children
• Knowlee is not designed for children under 13. If you suspect such data collection, contact us at knowlee.ai@gmail.com. Those 13-18 need parental consent.

7. Links to Other Websites
• We might link external sites not controlled by Knowlee. Their data handling is determined by their respective policies, not ours.

8. Security and Retention
• We adopt robust measures to protect your data both online and offline. However, online data transfer isn't foolproof.
• Your data is retained as long as necessary for our Service provision, dispute resolutions, safety, or legal compliance.

9. Use of Third-Party APIs
• All the data that you decide to share with us can be used by third-party AI tools solely for the purpose of providing personalized services. We do not use this data for developing, improving, or training generalized or non-personalized AI/ML models.
• We may share user data obtained through third-party APIs with third-party AI tools solely for the purpose of providing personalized services and not for developing, improving, or training generalized or non-personalized AI/ML models.

10. Data Transfers
• We will transfer your Personal Data to recipients outside of the EEA, Switzerland, and the UK for the purposes described in this Privacy Policy. If you are based in the EEA, Switzerland, or the UK and your Personal Data is transferred to a third country, that third country may not offer the same level of data protection as your home country. However, we transfer Personal Data pursuant to applicable data protection laws.

11. Changes to the Privacy Policy
• We may update this Privacy Policy from time to time. When we do, we will post an updated version on this page, unless another type of notice is required by applicable law.

12. How to Contact Us
• If you have any concerns about this Privacy Policy, please contact us at knowlee.ai@gmail.com.
    `
  }

];

export default TermsOfService;
