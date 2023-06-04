import { twMerge } from 'tailwind-merge';
import { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';

/**
 * It takes an array of class names, and returns a single class name
 * @param {ClassNameValue[]} classLists - ClassNameValue[]
 */
export const cn = (...classLists: ClassNameValue[]) => twMerge(classLists);
