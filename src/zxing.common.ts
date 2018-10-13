export interface ZxingBarcodeCreationOptions {
    encode: string;
    width: number;
    height: number;
    format: any;
}

export interface ZxingBarcodeDecodeOptions {
    formats: Array<any>;
    tryHarder: boolean;
    characterSet: any;
}

export interface ZxingBarcodeDecodeResult {
    format: string;
    barcode: string;
}

export interface NativeZXingCommon {
    createBarcode(options: ZxingBarcodeCreationOptions);
    decodeBarcode(bitmap, options: ZxingBarcodeDecodeOptions): ZxingBarcodeDecodeResult;
}