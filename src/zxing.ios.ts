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

declare const ZXBarcodeFormat;
declare const ZXMultiFormatWriter;
declare const interop;
declare const UIImage;
declare const ZXCGImageLuminanceSource;
declare const ZXImage;
declare const ZXMultiFormatReader;
declare const ZXBinaryBitmap;
declare const ZXHybridBinarizer;
declare const ZXDecodeHints;


export class NativeZXing implements NativeZXingCommon {
    // Create Mapping to make this simpler to choose a barcode type.
    public static QR_CODE = ZXBarcodeFormat.kBarcodeFormatQRCode;
    public static EAN_8 = ZXBarcodeFormat.kBarcodeFormatEan8;
    public static UPC_E = ZXBarcodeFormat.kBarcodeFormatUPCE;
    public static EAN_13 = ZXBarcodeFormat.kBarcodeFormatEan13;
    public static UPC_A = ZXBarcodeFormat.kBarcodeFormatUPCA;
    public static CODE_39 = ZXBarcodeFormat.kBarcodeFormatCode39;
    public static CODE_93 = ZXBarcodeFormat.kBarcodeFormatCode93;
    public static CODE_128 = ZXBarcodeFormat.kBarcodeFormatCode128;
    public static ITF = ZXBarcodeFormat.kBarcodeFormatITF;
    public static PDF_417 = ZXBarcodeFormat.kBarcodeFormatPDF417;
    public static CODABAR = ZXBarcodeFormat.kBarcodeFormatCodabar;
    public static DATA_MATRIX = ZXBarcodeFormat.kBarcodeFormatDataMatrix;
    public static AZTEC = ZXBarcodeFormat.kBarcodeFormatAztec;

    QR_CODE = NativeZXing.QR_CODE;
    EAN_8 = NativeZXing.EAN_8;
    UPC_E = NativeZXing.UPC_E;
    EAN_13 = NativeZXing.EAN_13;
    UPC_A = NativeZXing.UPC_A;
    CODE_39 = NativeZXing.CODE_39;
    CODE_93 = NativeZXing.CODE_93;
    CODE_128 = NativeZXing.CODE_128;
    ITF = NativeZXing.ITF;
    PDF_417 = NativeZXing.PDF_417;
    CODABAR = NativeZXing.CODABAR;
    DATA_MATRIX = NativeZXing.DATA_MATRIX;
    AZTEC = NativeZXing.AZTEC;

    createBarcode(options: ZxingBarcodeCreationOptions) {
        var encode="NOTHING", width=100, height=100, format = this.QR_CODE;
        if (options) {
            if (options.encode) {
                encode = options.encode;
            }
            if (options.width) {
                width = options.width;
            }
            if (options.height) {
                height = options.height;
            }
            if (typeof options.format !== "undefined") {
                format = options.format;
            }
        }
        var error = new interop.Reference();
        var writer = ZXMultiFormatWriter.writer();
        var result = writer.encodeFormatWidthHeightError(encode, format, width, height, error);
    
        if (result) {
            return UIImage.alloc().initWithCGImage(ZXImage.imageWithMatrix(result).cgimage);
        } else {
            return error.localizedDescription().toString();
        }
    }

    decodeBarcode(bitmap, options: ZxingBarcodeDecodeOptions): ZxingBarcodeDecodeResult {
        if (bitmap === null)
        {
            return null;
        }
    
        var source = ZXCGImageLuminanceSource.alloc().initWithCGImage(bitmap);
        var hybBitmap = ZXBinaryBitmap.binaryBitmapWithBinarizer(ZXHybridBinarizer.binarizerWithSource(source));
    
        source = null;
    
        var hints = ZXDecodeHints.hints();
    
        if (options && options.formats) {
            for (var i=0;i<options.formats.length;i++) {
                hints.addPossibleFormat(options.formats[i]);
            }
        }
    
        if (options && options.tryHarder) {
            hints.tryHarder = true;
        }
    
        if (options && options.characterSet) {
            hints.encoding = options.characterSet;
        }
    
    
        var error = new interop.Reference();
        var reader = ZXMultiFormatReader.reader();
        try
        {
            var result = reader.decodeHintsError(hybBitmap, hints, error);
            if (result) {
                hybBitmap = null;
                return {
                    format: this._getBarcodeFormatText(result.barcodeFormat),
                    barcode: result.text.toString()
                }
            } else {
                console.log("Err", error.localizedDescription().toString());
            }
        }
        catch (err)
        {
            // console.log(err);
        }
        return null;
    
    }

    private _getBarcodeFormatText(id) {
        switch (id) {
            case NativeZXing.QR_CODE: return 'QR_CODE';
            case NativeZXing.EAN_8: return 'EAN_8';
            case NativeZXing.UPC_E: return 'UPC_E';
            case NativeZXing.EAN_13: return 'EAN_13';
            case NativeZXing.UPC_A: return 'UPC_A';
            case NativeZXing.CODE_39: return 'CODE_39';
            case NativeZXing.CODE_93: return 'CODE_93';
            case NativeZXing.CODE_128: return 'CODE_128';
            case NativeZXing.ITF: return 'ITF';
            case NativeZXing.PDF_417: return 'PDF_417';
            case NativeZXing.CODABAR: return 'CODABAR';
            case NativeZXing.DATA_MATRIX: return 'DATA_MATRIX';
            case NativeZXing.AZTEC: return 'AZTEC';
            default: return 'UNKNOWN';
        }
    }
}
