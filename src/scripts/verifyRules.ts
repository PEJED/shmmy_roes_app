import { validateDirectionSelection } from '../utils/flowValidation';
import type { FlowSelection } from '../utils/flowValidation';
import { calculateDetailedStats } from '../utils/ruleEngine';

function assert(condition: boolean, message: string) {
    if (!condition) {
        console.error("❌ FAIL:", message);
    } else {
        console.log("✅ PASS:", message);
    }
}

console.log("Starting Rule Verification Tests...");

// 1. Test Direction Flow Requirements (Informatics)
// Informatics valid: Full Y + Full L + Full D
const validFlows1: Record<string, FlowSelection> = { 'Y': 'full', 'L': 'full', 'D': 'full' };
const res1 = validateDirectionSelection('Informatics', validFlows1);
assert(res1.isValid === true, "Informatics: Full Y + Full L + Full D should be valid");

// Informatics valid: Full Y + Half L + Full D
const validFlows2: Record<string, FlowSelection> = { 'Y': 'full', 'L': 'half', 'D': 'full' };
const res2 = validateDirectionSelection('Informatics', validFlows2);
assert(res2.isValid === true, "Informatics: Full Y + Half L + Full D should be valid");

// Informatics invalid: Full Y + Half L + Half D
const invalidFlows1: Record<string, FlowSelection> = { 'Y': 'full', 'L': 'half', 'D': 'half' };
const res3 = validateDirectionSelection('Informatics', invalidFlows1);
assert(res3.isValid === false, "Informatics: Full Y + Half L + Half D should be invalid");

// 2. Test Direction Flow Requirements (Electronics)
// Electronics valid: Full H + Full Y + Half S
const validFlows3: Record<string, FlowSelection> = { 'H': 'full', 'Y': 'full', 'S': 'half' };
const res4 = validateDirectionSelection('Electronics', validFlows3);
assert(res4.isValid === true, "Electronics: Full H + Full Y + Half S should be valid");

// 3. Test Flow internal composition (Y Full)
// 7 courses, 4 compulsory
const fakeCourses = [];
for (let i = 0; i < 7; i++) {
    fakeCourses.push({ id: 1000 + i, flow_code: 'Y', is_flow_compulsory: i < 4, semester: 7, type: 'core' });
}
// We also need to map them to the specific IDs in FLOW_RULES['Y']['full']
fakeCourses[0].id = 3136; // comp
fakeCourses[1].id = 3046; // comp
fakeCourses[2].id = 3352; // comp
fakeCourses[3].id = 3213; // option
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stats1 = calculateDetailedStats(fakeCourses as any, 'Informatics', { 'Y': 'full', 'L': 'full', 'D': 'full' });
assert(!stats1.warnings.find(w => w.includes('Ροή Υ (Ολόκληρη)')), "Flow Y Full: 7 courses, strict options met should have no flow warnings");

// 4. Test 6th Semester Rule
// Need 3 basic flows, 6th semester compulsory.
const fake6thCourses = [
    { id: 2001, flow_code: 'Y', is_flow_compulsory: true, semester: 6, type: 'core' },
    { id: 2002, flow_code: 'L', is_flow_compulsory: true, semester: 6, type: 'core' },
    { id: 2003, flow_code: 'D', is_flow_compulsory: true, semester: 6, type: 'core' }
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stats2 = calculateDetailedStats([...fakeCourses, ...fake6thCourses] as any, 'Informatics', { 'Y': 'full', 'L': 'full', 'D': 'full' });
assert(!stats2.warnings.find(w => w.includes('Κανόνας 6ου Εξαμήνου')), "6th Semester Rule: 3 basic flows satisfied");

const fake6thFail = [
    { id: 2001, flow_code: 'Y', is_flow_compulsory: true, semester: 6, type: 'core' },
    { id: 2002, flow_code: 'L', is_flow_compulsory: true, semester: 6, type: 'core' }
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stats3 = calculateDetailedStats([...fakeCourses, ...fake6thFail] as any, 'Informatics', { 'Y': 'full', 'L': 'full', 'D': 'full' });
assert(stats3.warnings.some(w => w.includes('Κανόνας 6ου Εξαμήνου')), "6th Semester Rule: 2 basic flows should fail");

console.log("Tests completed.");
