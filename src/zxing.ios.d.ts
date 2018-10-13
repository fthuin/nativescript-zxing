/**********************************************************************************
 * (c) 2016-2017, Master Technology
 *
 * Licensed under the APACHE license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 0.0.4                                      Nathan@master-technology.com
 *********************************************************************************/
import { NativeZXingCommon, ZxingBarcodeCreationOptions, ZxingBarcodeDecodeOptions, ZxingBarcodeDecodeResult } from "./zxing.common";
export declare class NativeZXing implements NativeZXingCommon {
    static QR_CODE: any;
    static EAN_8: any;
    static UPC_E: any;
    static EAN_13: any;
    static UPC_A: any;
    static CODE_39: any;
    static CODE_93: any;
    static CODE_128: any;
    static ITF: any;
    static PDF_417: any;
    static CODABAR: any;
    static DATA_MATRIX: any;
    static AZTEC: any;
    QR_CODE: any;
    EAN_8: any;
    UPC_E: any;
    EAN_13: any;
    UPC_A: any;
    CODE_39: any;
    CODE_93: any;
    CODE_128: any;
    ITF: any;
    PDF_417: any;
    CODABAR: any;
    DATA_MATRIX: any;
    AZTEC: any;
    createBarcode(options: ZxingBarcodeCreationOptions): any;
    decodeBarcode(bitmap: any, options: ZxingBarcodeDecodeOptions): ZxingBarcodeDecodeResult;
    private _getBarcodeFormatText(id);
}
