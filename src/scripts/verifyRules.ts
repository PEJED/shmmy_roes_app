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
let validFlows1: Record<string, FlowSelection> = { 'Y': 'full', 'L': 'full', 'D': 'full' };
let res1 = validateDirectionSelection('Informatics', validFlows1);
assert(res1.isValid === true, "Informatics: Full Y + Full L + Full D should be valid");

// Informatics valid: Full Y + Half L + Full D
let validFlows2: Record<string, FlowSelection> = { 'Y': 'full', 'L': 'half', 'D': 'full' };
let res2 = validateDirectionSelection('Informatics', validFlows2);
assert(res2.isValid === true, "Informatics: Full Y + Half L + Full D should be valid");

// Informatics invalid: Full Y + Half L + Half D
let invalidFlows1: Record<string, FlowSelection> = { 'Y': 'full', 'L': 'half', 'D': 'half' };
let res3 = validateDirectionSelection('Informatics', invalidFlows1);
assert(res3.isValid === false, "Informatics: Full Y + Half L + Half D should be invalid");

// 2. Test Direction Flow Requirements (Electronics)
// Electronics valid: Full H + Full Y + Half S
let validFlows3: Record<string, FlowSelection> = { 'H': 'full', 'Y': 'full', 'S': 'half' };
let res4 = validateDirectionSelection('Electronics', validFlows3);
assert(res4.isValid === true, "Electronics: Full H + Full Y + Half S should be valid");

// 3. Test Flow internal composition (Y Full)
// 7 courses, 4 compulsory
let fakeCourses = [];
for (let i = 0; i < 7; i++) {
    fakeCourses.push({ id: 1000 + i, flow_code: 'Y', is_flow_compulsory: i < 4, semester: 7, type: 'core' });
}
// We also need to map them to the specific IDs in FLOW_RULES['Y']['full']
fakeCourses[0].id = 3136; // comp
fakeCourses[1].id = 3046; // comp
fakeCourses[2].id = 3352; // comp
fakeCourses[3].id = 3213; // option
let stats1 = calculateDetailedStats(fakeCourses as any, 'Informatics', { 'Y': 'full', 'L': 'full', 'D': 'full' });
assert(!stats1.warnings.find(w => w.includes('Ροή Y (Ολόκληρη)')), "Flow Y Full: 7 courses, strict options met should have no flow warnings");

// 4. Test 6th Semester Rule
// Need 3 basic flows, 6th semester compulsory.
let fake6thCourses = [
    { id: 2001, flow_code: 'Y', is_flow_compulsory: true, semester: 6, type: 'core' },
    { id: 2002, flow_code: 'L', is_flow_compulsory: true, semester: 6, type: 'core' },
    { id: 2003, flow_code: 'D', is_flow_compulsory: true, semester: 6, type: 'core' }
];
let stats2 = calculateDetailedStats([...fakeCourses, ...fake6thCourses] as any, 'Informatics', { 'Y': 'full', 'L': 'full', 'D': 'full' });
assert(!stats2.warnings.find(w => w.includes('Κανόνας 6ου Εξαμήνου')), "6th Semester Rule: 3 basic flows satisfied");

let fake6thFail = [
    { id: 2001, flow_code: 'Y', is_flow_compulsory: true, semester: 6, type: 'core' },
    { id: 2002, flow_code: 'L', is_flow_compulsory: true, semester: 6, type: 'core' }
];
let stats3 = calculateDetailedStats([...fakeCourses, ...fake6thFail] as any, 'Informatics', { 'Y': 'full', 'L': 'full', 'D': 'full' });
assert(stats3.warnings.some(w => w.includes('Κανόνας 6ου Εξαμήνου')), "6th Semester Rule: 2 basic flows should fail");

console.log("Tests completed.");
