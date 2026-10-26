export function checkRealType(value: any): 'INTEGER' | 'STRING' {
    if (typeof value === 'number' && Number.isInteger(value)) {
        return 'INTEGER';
    } else if (typeof value === 'string') {
        const parsed = Number(value);
        if (!isNaN(parsed) && Number.isInteger(parsed)) {
            return 'INTEGER';
        }
        return 'STRING';
    } else {
        throw new Error('Unsupported type');
    }
}

// Helper to format date if value is present
export function formatDate(dateValue: any) {
    return dateValue
        ? this.datePipe.transform(dateValue, 'yyyy-MM-dd HH:mm:00.000')
        : '';
}
