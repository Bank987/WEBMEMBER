import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { HomeIcon, CompassIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background text-foreground">
			<Empty>
				<EmptyHeader>
					<EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl">
						404
					</EmptyTitle>
					<EmptyDescription className="-mt-8 text-nowrap text-foreground/80">
                                                หน้าที่คุณกำลังค้นหาอาจถูกย้าย <br />
                                                หรือไม่มีอยู่ในระบบ
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button asChild>
							<Link href="/">
								<HomeIcon
								className="size-4 mr-2" data-icon="inline-start" />
                                                                กลับหน้าหลัก
							</Link>
						</Button>

						<Button asChild variant="outline">
							<Link href="/members">
								<CompassIcon 
								className="size-4 mr-2" 
								data-icon="inline-start" />{" "}
                                                                ดูสมาชิก
							</Link>
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
