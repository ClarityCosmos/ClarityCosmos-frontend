const Service = () => {
    return (
        <section id="terms-of-service" className="py-20 bg-[#1f2430] bg-card/30 relative overflow-hidden min-h-screen">
            <div className="container mx-auto max-w-5xl relative px-4">

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-center bg-linear-to-r from-[#FBBF24] to-white bg-clip-text text-transparent">
                    Terms of Service
                </h2>

                {/* Terms Card */}
                <div className="border border-[#e0c273] rounded-xl bg-white/5 backdrop-blur-sm p-8 md:p-12 text-white space-y-8">

                    {/* Section 1 */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                            1. Service Description
                        </h3>
                        <p className="text-foreground leading-relaxed">
                            Clarity Cosmos provides AI-powered video generation services.
                            By using our platform, you agree to provide valid payment for
                            the credits used to generate videos.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                            2. User Accounts
                        </h3>
                        <p className="text-foreground leading-relaxed">
                            You are responsible for maintaining the security of your account.
                            One account per user is permitted during the Beta phase.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                            3. Usage Limits
                        </h3>
                        <p className="text-foreground leading-relaxed">
                            Abuse of the AI generation system (for example, attempting to bypass
                            safety filters or using automated botting systems) will result in
                            immediate account suspension without a refund.
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div>
                        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                            4. Intellectual Property
                        </h3>
                        <p className="text-foreground leading-relaxed">
                            Users retain ownership of the content generated, subject to the
                            licensing terms of our underlying AI models (Gemini / D-ID).
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Service;