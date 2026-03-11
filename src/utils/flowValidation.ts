// Defines flow requirements for each direction

export type Direction = 'Electronics' | 'Informatics' | 'Communications' | 'Energy';
export type FlowSelection = 'none' | 'half' | 'full';

export interface DirectionRules {
  name: string;
  description: string;
}

export const DIRECTION_INFO: Record<Direction, DirectionRules> = {
  Electronics: {
    name: 'Ηλεκτρονικής',
    description: 'Εστιάζει στη σχεδίαση και ανάλυση ηλεκτρονικών κυκλωμάτων, μικροηλεκτρονικής, ενσωματωμένων συστημάτων και αισθητήρων. Συνδυάζει υλικό (hardware) με θεωρία ελέγχου και μετρήσεων.',
  },
  Informatics: {
    name: 'Πληροφορικής',
    description: 'Καλύπτει το πλήρες φάσμα της επιστήμης υπολογιστών, από τη θεωρία αλγορίθμων και τις βάσεις δεδομένων, μέχρι τη μηχανική μάθηση, την τεχνητή νοημοσύνη και την ανάπτυξη λογισμικού.',
  },
  Communications: {
    name: 'Επικοινωνιών',
    description: 'Ασχολείται με τη μετάδοση πληροφορίας, τα ασύρματα και ενσύρματα δίκτυα, τις τηλεπικοινωνιακές ζεύξεις, τις κεραίες και την επεξεργασία σήματος για επικοινωνίες.',
  },
  Energy: {
    name: 'Ενέργειας',
    description: 'Εξειδικεύεται στην παραγωγή, μεταφορά και διανομή ηλεκτρικής ενέργειας, τις ανανεώσιμες πηγές, τα ηλεκτρικά δίκτυα, τους κινητήρες και την υψηλή τάση.',
  },
};

export const FLOW_NAMES: Record<string, string> = {
  'Y': 'Ροή Υ',
  'L': 'Ροή Λ',
  'D': 'Ροή Δ',
  'H': 'Ροή Η',
  'T': 'Ροή Τ',
  'S': 'Ροή Σ',
  'E': 'Ροή Ε',
  'Z': 'Ροή Ζ',
  'O': 'Ροή Ο',
  'I': 'Ροή Ι',
  'M': 'Ροή Μ',
  'F': 'Ροή Φ',
  'G': 'Μη εντασσόμενα σε ροές',
  'K': 'Ανθρωπιστικά',
  'P': 'Κορμός'
};

export const FLOW_DESCRIPTIONS: Record<string, string> = {
  'Y': 'Υπολογιστικά Συστήματα',
  'L': 'Τεχνολογία Λογισμικού',
  'D': 'Δίκτυα Υπολογιστών',
  'H': 'Ηλεκτρονική και Κυκλώματα',
  'T': 'Τηλεπικοινωνιακά Συστήματα',
  'S': 'Συστήματα Αποφάσεων',
  'E': 'Συστήματα Ενέργειας',
  'Z': 'Σήματα και Ελεγχος',
  'O': 'Οικονομία και Διοίκηση',
  'I': 'Βιοϊατρική Τεχνολογία',
  'M': 'Εφαρμοσμένα Μαθηματικά',
  'F': 'Εφαρμοσμένη Φυσική',
  'G': 'Μαθήματα Γενικής Παιδείας',
  'K': 'Ανθρωπιστικές Σπουδές'
};

export const FLOW_DETAILS: Record<string, string> = {
  'Y': 'Εμβαθύνει στην αρχιτεκτονική υπολογιστών, τον σχεδιασμό ψηφιακών συστημάτων, τους μικροεπεξεργαστές, τα ενσωματωμένα συστήματα και την παράλληλη επεξεργασία. Επικεντρώνεται στο υλικό (hardware) και τη διεπαφή του με το λογισμικό. Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Λογική Σχεδίαση Ψηφιακών Συστημάτων (1ο), Προγραμματισμός Η/Υ (1ο), Θεμελιώδη Θέματα Επιστήμης Υπολογιστών (3ο), Αρχιτεκτονική Υπολογιστών (5ο).',
  'L': 'Επικεντρώνεται στον σχεδιασμό, την ανάπτυξη και τη διαχείριση πολύπλοκων συστημάτων λογισμικού. Καλύπτει αλγόριθμους, βάσεις δεδομένων, μεταγλωττιστές, τεχνητή νοημοσύνη, γραφικά υπολογιστών και ασφάλεια συστημάτων. Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Προγραμματισμός Η/Υ (1ο), Προγραμματιστικές Τεχνικές (2ο), Θεμελιώδη Θέματα Επιστήμης Υπολογιστών (3ο), Διακριτά Μαθηματικά (4ο).',
  'D': 'Ασχολείται με την αρχιτεκτονική και τα πρωτόκολλα δικτύων υπολογιστών, τα ασύρματα και κινητά δίκτυα, το διαδίκτυο των πραγμάτων (IoT), τον σχεδιασμό δικτυακών εφαρμογών και την ασφάλεια τηλεπικοινωνιακών δικτύων. Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Δίκτυα Επικοινωνιών (4ο), Στοχαστικά Συστήματα (4ο), Εισαγωγή στις Τηλεπικοινωνίες (5ο).',
  'H': 'Εστιάζει στη σχεδίαση αναλογικών και ψηφιακών ηλεκτρονικών κυκλωμάτων, τη μικροηλεκτρονική, τα συστήματα VLSI, την οπτοηλεκτρονική και τους αισθητήρες. Παρέχει θεμελιώδεις γνώσεις για την ανάπτυξη σύγχρονου υλικού. Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Εισαγωγικό Εργαστήριο Ηλεκτρονικής (3ο), Ηλεκτρονική Ι (4ο).',
  'T': 'Καλύπτει τη θεωρία πληροφορίας, τα συστήματα εκπομπής και λήψης, τη διαμόρφωση σημάτων, τις κεραιοσυστημικές διατάξεις, τα μικροκύματα, τις οπτικές ίνες και τις σύγχρονες δορυφορικές επικοινωνίες. Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Σήματα και Συστήματα (3ο), Ηλεκτρομαγνητικά Πεδία Α (4ο), Ηλεκτρομαγνητικά Πεδία Β (5ο), Εισαγωγή στις Τηλεπικοινωνίες (5ο).',
  'S': 'Εμβαθύνει στον αυτόματο έλεγχο, τη ρομποτική, τον βιομηχανικό έλεγχο, τα συστήματα αποφάσεων, τη μηχανική μάθηση και την επιχειρησιακή έρευνα για τη βελτιστοποίηση και αυτοματοποίηση διαδικασιών. Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Σήματα και Συστήματα (3ο), Εισαγωγή στον Αυτόματο Ελεγχο (5ο).',
  'E': 'Εξειδικεύεται στην παραγωγή, μεταφορά, διανομή και αποθήκευση ηλεκτρικής ενέργειας. Περιλαμβάνει ανανεώσιμες πηγές, υδροηλεκτρικά, υψηλές τάσεις και "έξυπνα" δίκτυα (smart grids). Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Ανάλυση Γραμμικών Κυκλωμάτων (2ο), Ηλεκτρικές Μετρήσεις (3ο), Εισαγωγή στα Συστήματα Ηλεκτρικής Ενέργειας (ΣΗΕ) (5ο).',
  'Z': 'Πραγματεύεται τις ηλεκτρικές μηχανές, τα συστήματα ηλεκτρικής κίνησης, τις βιομηχανικές εγκαταστάσεις, τον έλεγχο μηχανών και τα ηλεκτρονικά ισχύος. Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Ανάλυση Γραμμικών Κυκλωμάτων (2ο), Βιομηχανική Ηλεκτρονική (5ο).',
  'O': 'Συνδυάζει την τεχνολογία με τα οικονομικά και τη σύγχρονη διοίκηση. Περιλαμβάνει μικρο/μακρο-οικονομία, διοίκηση επιχειρήσεων, διαχείριση έργων (project management) και χρηματοοικονομική μηχανική. Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Θεωρία Πιθανοτήτων και Στατιστική (3ο), Πολιτική Οικονομία (3ο), Οργάνωση και Διοίκηση (3ο).',
  'I': 'Εφαρμόζει τις αρχές της μηχανικής στην ιατρική και τη βιολογία. Ασχολείται με την ιατρική απεικόνιση, τα ιατρικά μηχανήματα, τη βιοϊατρική οργανολογία και την επεξεργασία βιοσημάτων. Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Δομή και Ηλεκτρικές Ιδιότητες Υλικών (2ο), Σήματα και Συστήματα (3ο), Ηλεκτρονική Ι (4ο).',
  'M': 'Επικεντρώνεται σε προχωρημένα μαθηματικά εργαλεία, τη θεωρία πιθανοτήτων, τη στατιστική ανάλυση, τη γραμμική άλγεβρα και την αριθμητική ανάλυση για σύνθετα προβλήματα. Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Γραμμική Αλγεβρα (1ο), Μαθηματική Ανάλυση (1ο, 2ο), Διαφορικές Εξισώσεις (2ο), Αριθμητική Ανάλυση (4ο).',
  'F': 'Προσφέρει βαθύτερη κατανόηση των φυσικών φαινομένων που διέπουν την τεχνολογία, όπως κβαντομηχανική, φυσική στερεάς κατάστασης, λέιζερ, φωτονική και επιστήμη υλικών. Μαθήματα προηγούμενων εξαμήνων που σχετίζονται με τη ροή: Φυσική Ι (1ο), Κυματική και Κβαντική Φυσική (4ο).',
  'G': 'Μαθήματα γενικής παιδείας και τεχνικής νομοθεσίας που δεν εντάσσονται σε συγκεκριμένη ροή.',
  'K': 'Μαθήματα ανθρωπιστικών και κοινωνικών επιστημών.'
};

// Helper: Check if flow is 'full'
const isFull = (flows: Record<string, FlowSelection>, code: string) => flows[code] === 'full';
// Helper: Check if flow is 'half'
const isHalf = (flows: Record<string, FlowSelection>, code: string) => flows[code] === 'half';

// Helper: Check specific condition for "Other" flows (excluding main ones)
// Returns true if the remaining flows match one of the 3 strict sub-options for "{at least 1/2 other}"
const checkAtLeastHalfOther = (flows: Record<string, FlowSelection>, excludeCodes: string[]) => {
  const otherFlows = Object.entries(flows).filter(([code, selection]) => {
    // I and O are included here because they can satisfy the "1 Full Flow" requirement for option (a)
    return !excludeCodes.includes(code) && selection !== 'none';
  });

  const fullCount = otherFlows.filter(([, s]) => s === 'full').length;
  const halfCount = otherFlows.filter(([, s]) => s === 'half').length;

  // Way 1: 1 Full extra flow
  if (fullCount === 1 && halfCount === 0) return true;

  // Way 2: 1 Half extra flow
  if (fullCount === 0 && halfCount === 1) return true;

  // Way 3: 2 Half extra flows
  if (fullCount === 0 && halfCount === 2) return true;

  return false;
};

// Helper: Check specific condition for "Full Other" (exactly 1 Full other)
const checkFullOther = (flows: Record<string, FlowSelection>, excludeCodes: string[], allowedCodes: string[]) => {
  const otherFlows = Object.entries(flows).filter(([code, selection]) => {
    return !excludeCodes.includes(code) && selection !== 'none';
  });

  if (otherFlows.length !== 1) return false;
  const [code, selection] = otherFlows[0];

  return selection === 'full' && allowedCodes.includes(code);
};

export function validateDirectionSelection(
  direction: Direction | null,
  flows: Record<string, FlowSelection>
): { isValid: boolean; error: string | null } {
  if (!direction) {
    return { isValid: false, error: 'Παρακαλώ επιλέξτε Κατεύθυνση.' };
  }

  // Global Check: Special Flows O and I can only be Full
  if (flows['O'] === 'half' || flows['I'] === 'half') {
      return { isValid: false, error: 'Οι ειδικές ροές Ο και Ι μπορούν να επιλεγούν μόνο ως Ολόκληρες.' };
  }

  switch (direction) {
    case 'Electronics':
      // a) Full H + {Full Y OR Full S} + {at least 1/2 other}
      if (isFull(flows, 'H')) {
        // We remove !isFull checks to allow supersets (e.g. H+Y+S all full) to be valid
        if (isFull(flows, 'Y')) {
           if (checkAtLeastHalfOther(flows, ['H', 'Y'])) return { isValid: true, error: null };
        }
        if (isFull(flows, 'S')) {
           if (checkAtLeastHalfOther(flows, ['H', 'S'])) return { isValid: true, error: null };
        }
      }

      // b) Full H + Half S + {Full Y OR Full T OR Full Z}
      if (isFull(flows, 'H') && isHalf(flows, 'S')) {
         if (checkFullOther(flows, ['H', 'S'], ['Y', 'T', 'Z'])) return { isValid: true, error: null };
      }

      // c) Half H + Full S + {Full L OR Full D OR Full E}
      if (isHalf(flows, 'H') && isFull(flows, 'S')) {
         if (checkFullOther(flows, ['H', 'S'], ['L', 'D', 'E'])) return { isValid: true, error: null };
      }

      return { isValid: false, error: 'Δεν πληρούνται οι κανόνες της Ηλεκτρονικής.' };

    case 'Informatics':
      // a) Full Y + Full L + {at least 1/2 other}
      if (isFull(flows, 'Y') && isFull(flows, 'L')) {
         if (checkAtLeastHalfOther(flows, ['Y', 'L'])) return { isValid: true, error: null };
      }

      // b) Full Y + Half L + {Full D OR Full S}
      if (isFull(flows, 'Y') && isHalf(flows, 'L')) {
         if (checkFullOther(flows, ['Y', 'L'], ['D', 'S'])) return { isValid: true, error: null };
      }

      // c) Half Y + Full L + {Full D OR Full S}
      if (isHalf(flows, 'Y') && isFull(flows, 'L')) {
         if (checkFullOther(flows, ['Y', 'L'], ['D', 'S'])) return { isValid: true, error: null };
      }

      return { isValid: false, error: 'Δεν πληρούνται οι κανόνες της Πληροφορικής.' };

    case 'Communications':
      // a) Full T + Full D + {at least 1/2 other}
      if (isFull(flows, 'T') && isFull(flows, 'D')) {
         if (checkAtLeastHalfOther(flows, ['T', 'D'])) return { isValid: true, error: null };
      }

      // b) Full T + Half D + {Full H OR Full S}
      if (isFull(flows, 'T') && isHalf(flows, 'D')) {
         if (checkFullOther(flows, ['T', 'D'], ['H', 'S'])) return { isValid: true, error: null };
      }

      // c) Half T + Full D + {Full Y OR Full L OR Full S}
      if (isHalf(flows, 'T') && isFull(flows, 'D')) {
         if (checkFullOther(flows, ['T', 'D'], ['Y', 'L', 'S'])) return { isValid: true, error: null };
      }

      return { isValid: false, error: 'Δεν πληρούνται οι κανόνες των Επικοινωνιών.' };

    case 'Energy':
      // a) Full E + Full Z + {at least 1/2 other}
      if (isFull(flows, 'E') && isFull(flows, 'Z')) {
         if (checkAtLeastHalfOther(flows, ['E', 'Z'])) return { isValid: true, error: null };
      }

      // b) Full E + Half Z + {Full T OR Full D OR Full S}
      if (isFull(flows, 'E') && isHalf(flows, 'Z')) {
         if (checkFullOther(flows, ['E', 'Z'], ['T', 'D', 'S'])) return { isValid: true, error: null };
      }

      // c) Half E + Full Z + {Full Y OR Full H OR Full S}
      if (isHalf(flows, 'E') && isFull(flows, 'Z')) {
         if (checkFullOther(flows, ['E', 'Z'], ['Y', 'H', 'S'])) return { isValid: true, error: null };
      }

      return { isValid: false, error: 'Δεν πληρούνται οι κανόνες της Ενέργειας.' };

    default:
      return { isValid: false, error: 'Αγνωστη Κατεύθυνση.' };
  }
}
