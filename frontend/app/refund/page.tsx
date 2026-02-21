const Refund = () => {
    return (
        <section
            id="refund-policy"
            className="py-20 bg-[#1f2430] bg-card/30 relative overflow-hidden min-h-screen"
        >
            <div className="container mx-auto max-w-5xl relative px-4">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center bg-linear-to-r from-[#FBBF24] to-white bg-clip-text text-transparent">
                    Refund and Cancellation Policy
                </h2>

                {/* Policy Card */}
                <div className="border border-[#e0c273] rounded-xl bg-white/5 backdrop-blur-sm p-8 md:p-12 text-white space-y-10">

                    {/* Section 1 */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                            1. Digital Credits & Subscriptions
                        </h3>
                        <p className="leading-relaxed mb-4">
                            Clarity Cosmos provides AI-powered digital services and subscription-based access.
                        </p>
                        <ul className="space-y-3 list-disc list-inside text-white/90">
                            <li>
                                <span className="font-semibold">Monthly Tiers:</span> Our Freemium,
                                Starter, and Pro plans are billed on a monthly basis.
                            </li>
                            <li>
                                <span className="font-semibold">Usage-Based Policy:</span> Since AI
                                credits are consumed upon generation, we generally do not offer
                                refunds once a video generation has been initiated or credits
                                have been utilized.
                            </li>
                        </ul>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                            2. Technical Failures
                        </h3>
                        <p className="leading-relaxed">
                            If a subscription payment is successful but the corresponding tier
                            features or credits are not assigned to your account due to a
                            technical error, please contact us at{" "}
                            <a
                                href="mailto:mehdinaqvii@claritycosmos.com"
                                className="text-[#FBBF24] underline"
                            >
                                mehdinaqvii@claritycosmos.com
                            </a>{" "}
                            with your transaction ID. We will manually rectify the account
                            status or assign the missing credits within 24 hours.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                            3. Subscription Cancellation
                        </h3>
                        <p className="leading-relaxed mb-4">
                            Users may cancel their Monthly Starter or Pro subscriptions at
                            any time through their account dashboard.
                        </p>
                        <ul className="space-y-3 list-disc list-inside text-white/90">
                            <li>
                                <span className="font-semibold">Access:</span> Upon cancellation,
                                you will retain access to your tier features until the end of
                                your current billing cycle.
                            </li>
                            <li>
                                <span className="font-semibold">No Pro-rated Refunds:</span> We
                                do not offer pro-rated refunds for partial months of service.
                            </li>
                        </ul>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                            4. Beta Phase Clause
                        </h3>
                        <p className="leading-relaxed">
                            During this Pre-Beta/Beta phase, users acknowledge that the
                            service is provided "as is." While we strive for 100% uptime,
                            refunds will only be considered in cases of total platform failure
                            lasting more than 48 hours.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Refund;