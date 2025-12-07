import { type Employee } from "../../zod-schema/schema.ts";

export const employees: Employee[] = [
    // Top Leadership
    {
        id: "1",
        name: "Mark Hill",
        designation: "Chief Executive Officer",
        team: "Leadership",
        manager: null,
    },

    // Direct reports to CEO
    {
        id: "2",
        name: "Joe Linux",
        designation: "Chief Technology Officer",
        team: "Technology",
        manager: "1",
    },
    {
        id: "3",
        name: "Linda May",
        designation: "Chief Business Officer",
        team: "Business",
        manager: "1",
    },
    {
        id: "4",
        name: "John Green",
        designation: "Chief Accounting Officer",
        team: "Finance",
        manager: "1",
    },

    // Reporting to CTO
    {
        id: "5",
        name: "Ron Blomquist",
        designation: "Chief Information Security Officer",
        team: "Technology",
        manager: "2",
    },
    {
        id: "6",
        name: "Michael Rubin",
        designation: "Chief Innovation Officer",
        team: "Technology",
        manager: "2",
    },

    // Reporting to CBO
    {
        id: "7",
        name: "Alice Lopez",
        designation: "Chief Communications Officer",
        team: "Business",
        manager: "3",
    },
    {
        id: "8",
        name: "Mary Johnson",
        designation: "Chief Brand Officer",
        team: "Business",
        manager: "3",
    },
    {
        id: "9",
        name: "Kirk Douglas",
        designation: "Chief Business Development Officer",
        team: "Business",
        manager: "3",
    },

    // Reporting to CAO
    {
        id: "10",
        name: "Erica Reel",
        designation: "Chief Customer Officer",
        team: "Customer",
        manager: "4",
    },
];