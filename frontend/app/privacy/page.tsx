

export default function privacy() {
    return (
        <div>
            <section id="privacy-policy" className="py-20 bg-[#1f2430] bg-card/30 relative overflow-hidden min-h-screen">
                <div className="container mx-auto max-w-5xl relative px-4">

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl  font-bold mb-12 text-center bg-linear-to-r from-[#FBBF24] to-white bg-clip-text text-transparent">
                        Privacy Policy
                    </h2>

                    {/* Policy Card */}
                    <div className="border border-[#e0c273] rounded-xl bg-white/5 backdrop-blur-sm p-8 md:p-12 text-white space-y-8">

                        {/* Section 1 */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                                1. Data Collection
                            </h3>
                            <p className="text-foreground leading-relaxed">
                                We collect your name, email address, and payment confirmation details.
                                We do not store credit card numbers on our servers. All payments are
                                processed securely via Safepay.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                                2. Use of Data
                            </h3>
                            <p className="text-foreground leading-relaxed">
                                Your data is used solely to provide the AI video service and
                                communicate updates regarding your account.
                            </p>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                                3. Data Security
                            </h3>
                            <p className="text-foreground leading-relaxed">
                                We implement industry-standard encryption to protect your personal
                                information. We do not sell user data to third parties.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FBBF24]">
                                4. Cookies
                            </h3>
                            <p className="text-foreground leading-relaxed">
                                We use essential cookies to keep you logged into the platform.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}