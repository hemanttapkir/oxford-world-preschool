import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Inquiry {
    preferredBranch: Branch;
    preferredProgram: Program;
    email: string;
    childAge: bigint;
    message: string;
    phoneNumber: string;
    childName: string;
    parentName: string;
}
export enum Branch {
    wadgaonSheri = "wadgaonSheri",
    lohegaon = "lohegaon"
}
export enum Program {
    playgroup = "playgroup",
    juniorKg = "juniorKg",
    nursery = "nursery"
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    submitInquiry(parentName: string, childName: string, childAge: bigint, phoneNumber: string, email: string, preferredProgram: Program, preferredBranch: Branch, message: string): Promise<void>;
}
