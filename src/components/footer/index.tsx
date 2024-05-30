import React from "react";
import style from "./style.module.css";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Image from "next/image";
import { imgs } from "@/assets/imgs";
import { Container, useMediaQuery } from "@mui/material";
import {
		Accordion,
		AccordionDetails,
		AccordionSummary,
		Typography,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";

export function Footer() {
		const IS_MB = useMediaQuery("(max-width:1023px)");
		const data = [
				{
						id: 1,
						title: "Product",
						child: [
								{
										id: 1,
										text: "Over View",
										link: "/",
								},
								{
										id: 2,
										text: "Pricing",
										link: "/",
								},
								{
										id: 3,
										text: "Custom stories",
										link: "/",
								},
						],
				},
				{
						id: 2,
						title: "Template",
						child: [
								{
										id: 1,
										text: "Landing",
										link: "/",
								},
								{
										id: 2,
										text: "Dashboard",
										link: "/",
								},
								{
										id: 3,
										text: "Security",
										link: "/",
								},
						],
				},
				{
						id: 3,
						title: "Resources",
						child: [
								{
										id: 1,
										text: "Blog",
										link: "/",
								},
								{
										id: 2,
										text: "Help center",
										link: "/",
								},
								{
										id: 3,
										text: "What news",
										link: "/",
								},
						],
				},
				{
						id: 4,
						title: "Company",
						child: [
								{
										id: 1,
										text: "About us",
										link: "/",
								},
								{
										id: 2,
										text: "Contact support",
										link: "/",
								},
						],
				},
		];
		return (
				<div className={style.footer}>
						<Container maxWidth={"xl"}>
								{IS_MB ? (
										<div className={style.footer__mb}>
												{data.map((item) => (
														<Accordion key={item.id}>
																<AccordionSummary
																		expandIcon={<IoIosArrowDown size="20" />}
																		aria-controls="panel1a-content"
																		id="panel1a-header"
																>
																		<Typography>{item.title}</Typography>
																</AccordionSummary>
																<AccordionDetails>
																		{item.child.map((child) => (
																				<Typography key={child.id}>
																						<Link
																								className={style.footer__link}
																								href={child.link}
																						>
																								{child.text}
																						</Link>
																				</Typography>
																		))}
																</AccordionDetails>
														</Accordion>
												))}
												{/* <p className={style.footer_left_title}>
														Liên hệ với chúng tôi
												</p>
												<div className={style.footer_left_socials}>
														<FcGoogle size={24} />
														<FcGoogle size={24} />
														<FcGoogle size={24} />
														<FcGoogle size={24} />
												</div> */}
										</div>
								) : (
										<>
												<div className={style.footer_wrap}>
														<div className={style.footer_left}>
																<div className={style.footer_logos}>
																		<Link
																				href="/"
																				className={style.footer_logo}
																		>
																				<Image
																						src={imgs.logoWhite}
																						width={24}
																						height={24}
																						alt="Logo"
																				/>
																		</Link>
																		<p>Lil Shop</p>
																</div>
																<p className={style.footer_left_title}>
																		Liên hệ với chúng tôi
																</p>
																<div className={style.footer_left_socials}>
																		<FcGoogle size={24} />
																		<FcGoogle size={24} />
																		<FcGoogle size={24} />
																		<FcGoogle size={24} />
																</div>
														</div>
														<div className={style.footer_right}>
																<div className={style.footer_right_lists}>
																		<ul className={style.footer_right_list}>
																				<li className={style.footer_right_item}>
																						Product
																				</li>
																				<li className={style.footer_right_item}>
																						Overview
																				</li>
																				<li className={style.footer_right_item}>
																						Pricing
																				</li>
																				<li className={style.footer_right_item}>
																						Custom stories
																				</li>
																		</ul>
																</div>
																<div className={style.footer_right_lists}>
																		<ul className={style.footer_right_list}>
																				<li className={style.footer_right_item}>
																						Templates
																				</li>
																				<li className={style.footer_right_item}>
																						Landing
																				</li>
																				<li className={style.footer_right_item}>
																						Dashboard
																				</li>
																				<li className={style.footer_right_item}>
																						Security
																				</li>
																		</ul>
																</div>
																<div className={style.footer_right_lists}>
																		<ul className={style.footer_right_list}>
																				<li className={style.footer_right_item}>
																						Resources
																				</li>
																				<li className={style.footer_right_item}>
																						Blog
																				</li>
																				<li className={style.footer_right_item}>
																						Help center
																				</li>
																				<li className={style.footer_right_item}>
																						What news
																				</li>
																		</ul>
																</div>
																<div className={style.footer_right_lists}>
																		<ul className={style.footer_right_list}>
																				<li className={style.footer_right_item}>
																						Company
																				</li>
																				<li className={style.footer_right_item}>
																						About us
																				</li>
																				<li className={style.footer_right_item}>
																						Contact support
																				</li>
																		</ul>
																</div>
														</div>
												</div>
												<div className={style.footer_hr}></div>
										</>
								)}

								<div className={style.footer_bottom}>
										<p>Copyright © 2023 | FutureDev. All right reserved.</p>
								</div>
						</Container>
				</div>
		);
}
