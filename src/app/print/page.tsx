import PrintPageContent from "@/components/print-page-content";
import { Suspense } from "react";

const PrintPage = () => {
	return (
		<>
			{/* Regular screen view */}
			<div className="min-h-screen bg-neutral-100 p-8">
				<div
					id="page"
					className="bg-white shadow-sm mx-auto w-[210mm] min-h-[297mm]"
				>
					<Suspense>
						<PrintPageContent />
					</Suspense>
				</div>
			</div>

			{/* Print styles */}
			<style>
				{`
                @media print {
                    @page {
                        margin: 0;
                    }

                    body {
                        margin: 0;
                        padding: 0;
                    }

                    .min-h-screen {
                        min-height: 0;
                    }

                    .bg-neutral-100 {
                        background: none;
                    }

                    .shadow-sm {
                        box-shadow: none;
                    }

                    #page {
                        min-height: 0;
                        width: auto;
                    }
                }
            `}
			</style>
		</>
	);
};

export default PrintPage;
