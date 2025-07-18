'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// --- Reusable Components ---
const Tooltip = ({ text }) => (
    <div className="tooltip-container">
        <span className="tooltip-icon">?</span>
        <span className="tooltip-text">{text}</span>
    </div>
);

const OptionSelector = ({ title, options, selectedValue, onChange, tooltipText }) => {
  return (
    <div className="spec-option-group">
      <div style={{display: 'flex', alignItems: 'center'}}>
        <label>{title}</label>
        <Tooltip text={tooltipText} />
      </div>
      <div className="option-buttons">
        {options.map(option => (
          <button key={option.value || option} type="button" className={`option-btn ${selectedValue === (option.value || option) ? 'active' : ''}`} onClick={() => onChange(option.value || option)}>
            {/* Check if the option has a color code */}
            {option.colorCode && <span className="color-dot" style={{ backgroundColor: option.colorCode }}></span>}
            {option.label || option}
          </button>
        ))}
      </div>
    </div>
  );
};

const ImageOptionSelector = ({ title, options, selectedValue, onChange, tooltipText }) => {
    return (
        <div className="spec-option-group">
            <div style={{display: 'flex', alignItems: 'center'}}>
                <label>{title}</label>
                <Tooltip text={tooltipText} />
            </div>
            <div className="option-buttons">
                {options.map(option => (
                    <button key={option.value} type="button" className={`image-option-btn ${selectedValue === option.value ? 'active' : ''}`} onClick={() => onChange(option.value)}>
                        <Image src={option.imageUrl} alt={option.label} width={60} height={45} />
                        <span>{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const ToggleSwitch = ({ title, description, checked, onChange }) => (
    <div className="toggle-section">
        <div className="toggle-info">
            {/* You can add icons here later if you want */}
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
        <label className="toggle-switch">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="slider"></span>
        </label>
    </div>
);


export default function QuoteSpecificationsPage() {
  const router = useRouter();
  
  const [specs, setSpecs] = useState({
    baseMaterial: 'FR-4',
    layers: '2',
    dimensionsX: 100,
    dimensionsY: 100,
    pcbQty: 5,
    productType: 'Industrial/Consumer electronics',
    differentDesign: 1,
    deliveryFormat: 'Single PCB',
    pcbThickness: '1.6mm',
    pcbColor: 'Green',
    silkscreen: 'White',
    surfaceFinish: 'HASL(with lead)',
    outerCopperWeight: '1 oz',
    viaCovering: 'Tented',
    minViaHole: '0.3mm(0.4/0.45mm)',
    boardOutlineTolerance: '±0.2mm(Regular)',
    confirmProductionFile: 'No',
    markOnPcb: 'Order Number',
    electricalTest: 'Flying Probe Fully Test',
    goldFingers: 'No',
    castellatedHoles: 'No',
    edgePlating: 'No',
    blindSlots: 'No',
    pcbRemark: '',
    pcbAssembly: false,
    stencil: false,
  });

  const baseMaterialOptions = [
      { value: 'FR-4', label: 'FR-4', imageUrl: '/images/fr4.png' },
      { value: 'Aluminum', label: 'Aluminum', imageUrl: '/images/aluminum.png' },
      { value: 'Rogers', label: 'Rogers', imageUrl: '/images/rogers.png' },
      { value: 'Flex', label: 'Flex', imageUrl: '/images/flex.png' },
  ];

  const pcbColorOptions = [
      { value: 'Green', label: 'Green', colorCode: '#16a34a' },
      { value: 'Purple', label: 'Purple', colorCode: '#9333ea' },
      { value: 'Red', label: 'Red', colorCode: '#dc2626' },
      { value: 'Yellow', label: 'Yellow', colorCode: '#facc15' },
      { value: 'Blue', label: 'Blue', colorCode: '#2563eb' },
      { value: 'White', label: 'White', colorCode: '#ffffff' },
      { value: 'Black', label: 'Black', colorCode: '#171717' },
  ];

  const silkscreenColorOptions = [
    { value: 'White', label: 'White', colorCode: '#ffffff' },
    { value: 'Black', label: 'Black', colorCode: '#171717' },
  ];

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  const handleSpecChange = (key, value) => {
    setSpecs(prevSpecs => ({ ...prevSpecs, [key]: value }));
  };
  
  const handleDimensionChange = (e, axis) => {
    handleSpecChange(axis, e.target.value);
  };

const handleGetOffer = () => {
    const offers = JSON.parse(localStorage.getItem('offers')) || [];
    const newOffer = { id: Date.now(), ...specs };
    offers.push(newOffer);
    localStorage.setItem('offers', JSON.stringify(offers));
    
    // Redirect to the offers page
    router.push('/offers');
};

  return (
    <div className="spec-page-container">
      <div className="spec-options-column">
        <h1>PCB Specifications</h1>

        <div className="spec-file-upload-area">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ccc' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            <span className="upload-main-text">Add Gerber File</span>
            <span className="upload-sub-text">(Drag & Drop or Click)</span>
            <p className="upload-info">Only accept .zip or .rar. Max 100 MB.</p>
        </div>

        <div className="spec-section">
          <div className="spec-section-content">
            <ImageOptionSelector title="Base Material" options={baseMaterialOptions} selectedValue={specs.baseMaterial} onChange={(val) => handleSpecChange('baseMaterial', val)} tooltipText="The substrate material of the PCB. FR-4 is the most common." />
            <OptionSelector title="Layers" options={['1', '2', '4', '6', '8', '10', '12', '14', '16']} selectedValue={specs.layers} onChange={(val) => handleSpecChange('layers', val)} tooltipText="The number of conductive copper layers in the PCB." />
            <div className="spec-option-group">
                <div style={{display: 'flex', alignItems: 'center'}}><label>Dimensions (mm)</label><Tooltip text="The length and width of the PCB board." /></div>
                <div className="dimension-inputs"><input type="number" value={specs.dimensionsX} onChange={(e) => handleDimensionChange(e, 'dimensionsX')} /><span>x</span><input type="number" value={specs.dimensionsY} onChange={(e) => handleDimensionChange(e, 'dimensionsY')} /></div>
            </div>
            <div className="spec-option-group">
                <div style={{display: 'flex', alignItems: 'center'}}><label>PCB Qty</label><Tooltip text="The total number of individual boards you wish to order." /></div>
                <div className="dimension-inputs"><input type="number" value={specs.pcbQty} onChange={(e) => handleSpecChange('pcbQty', e.target.value)} /></div>
            </div>
            <OptionSelector title="Product Type" options={['Industrial/Consumer electronics', 'Aerospace', 'Medical']} selectedValue={specs.productType} onChange={(val) => handleSpecChange('productType', val)} tooltipText="The intended application of your PCB, which can affect manufacturing standards." />
          </div>
        </div>
        
        <div className="spec-section">
            <h2>PCB Specifications</h2>
            <div className="spec-section-content">
              <div className="spec-option-group">
                <div style={{display: 'flex', alignItems: 'center'}}><label>Different Design</label><Tooltip text="The number of unique designs within a single panelized file." /></div>
                <div className="dimension-inputs"><input type="number" value={specs.differentDesign} onChange={(e) => handleSpecChange('differentDesign', e.target.value)} /></div>
              </div>
              <OptionSelector title="Delivery Format" options={['Single PCB', 'Panel by Customer', 'Panel by Bit Elektronik']} selectedValue={specs.deliveryFormat} onChange={(val) => handleSpecChange('deliveryFormat', val)} tooltipText="Choose how you want your PCBs delivered: as individual boards or grouped in a panel." />
              <OptionSelector title="PCB Thickness" options={['0.4mm', '0.6mm', '0.8mm', '1.0mm', '1.2mm', '1.6mm', '2.0mm']} selectedValue={specs.pcbThickness} onChange={(val) => handleSpecChange('pcbThickness', val)} tooltipText="The overall thickness of the final PCB board. 1.6mm is standard." />
              <OptionSelector title="PCB Color" options={pcbColorOptions} selectedValue={specs.pcbColor} onChange={(val) => handleSpecChange('pcbColor', val)} tooltipText="The color of the solder mask, which protects the copper traces." />
              <OptionSelector title="Silkscreen" options={silkscreenColorOptions} selectedValue={specs.silkscreen} onChange={(val) => handleSpecChange('silkscreen', val)} tooltipText="The color of the text and component outlines printed on the board." />
              <OptionSelector title="Surface Finish" options={['HASL(with lead)', 'LeadFree HASL', 'ENIG']} selectedValue={specs.surfaceFinish} onChange={(val) => handleSpecChange('surfaceFinish', val)} tooltipText="The protective coating applied to the copper pads. ENIG is flatter and better for fine-pitch components." />
            </div>
        </div>
        
        <div className="spec-section">
            <h2>High-spec Options</h2>
            <div className="spec-section-content">
              <OptionSelector title="Outer Copper Weight" options={['1 oz', '2 oz']} selectedValue={specs.outerCopperWeight} onChange={(val) => handleSpecChange('outerCopperWeight', val)} tooltipText="The thickness of the copper on the outer layers. Higher values support more current." />
              <OptionSelector title="Via Covering" options={['Tented', 'Untented', 'Plugged']} selectedValue={specs.viaCovering} onChange={(val) => handleSpecChange('viaCovering',val)} tooltipText="How vias (connections between layers) are treated. Tented is most common." />
              <OptionSelector title="Min via hole size/diameter" options={['0.3mm(0.4/0.45mm)', '0.25mm(0.35/0.4mm)', '0.2mm(0.3/0.35mm)']} selectedValue={specs.minViaHole} onChange={(val) => handleSpecChange('minViaHole', val)} tooltipText="The minimum diameter of the finished hole and its surrounding pad."/>
              <OptionSelector title="Board Outline Tolerance" options={['±0.2mm(Regular)', '±0.1mm(Precision)']} selectedValue={specs.boardOutlineTolerance} onChange={(val) => handleSpecChange('boardOutlineTolerance',val)} tooltipText="The acceptable deviation from the specified board dimensions." />
              <OptionSelector title="Confirm Production file" options={['No', 'Yes']} selectedValue={specs.confirmProductionFile} onChange={(val) => handleSpecChange('confirmProductionFile', val)} tooltipText="Select 'Yes' to have us send you the final production file for confirmation before manufacturing."/>
              <OptionSelector title="Mark on PCB" options={['Order Number', '2D barcode (Serial Number)', 'Remove Mark']} selectedValue={specs.markOnPcb} onChange={(val) => handleSpecChange('markOnPcb', val)} tooltipText="Choose what information, if any, is marked on your PCB for identification."/>
              <OptionSelector title="Electrical Test" options={['Flying Probe Fully Test']} selectedValue={specs.electricalTest} onChange={(val) => handleSpecChange('electricalTest', val)} tooltipText="A test to check for shorts and open circuits on the board."/>
              <OptionSelector title="Gold Fingers" options={['No', 'Yes']} selectedValue={specs.goldFingers} onChange={(val) => handleSpecChange('goldFingers', val)} tooltipText="Hard, gold-plated connectors on the edge of a PCB, designed for repeated insertions." />
              <OptionSelector title="Castellated Holes" options={['No', 'Yes']} selectedValue={specs.castellatedHoles} onChange={(val) => handleSpecChange('castellatedHoles', val)} tooltipText="Plated holes on the edge of the board, allowing one PCB to be soldered onto another." />
              <OptionSelector title="Edge Plating" options={['No', 'Yes']} selectedValue={specs.edgePlating} onChange={(val) => handleSpecChange('edgePlating', val)} tooltipText="A continuous plating of copper and surface finish along the edges of the PCB." />
              <OptionSelector title="Blind Slots" options={['No', 'Yes']} selectedValue={specs.blindSlots} onChange={(val) => handleSpecChange('blindSlots', val)} tooltipText="Slots or cutouts that do not go all the way through the PCB." />
            </div>
        </div>

        <div className="spec-section">
            <h2>Advanced Options</h2>
            <div className="spec-section-content">
                <div className="spec-option-group">
                    <div style={{display: 'flex', alignItems: 'center'}}><label htmlFor="pcbRemark">PCB Remark</label><Tooltip text="Add any special requests or notes for our engineers here." /></div>
                    <textarea 
                      id="pcbRemark" 
                      rows="3" 
                      value={specs.pcbRemark} 
                      onChange={(e) => handleSpecChange('pcbRemark', e.target.value)}
                      style={{width: '100%', padding: '8px', border: '1px solid var(--border-color)', borderRadius: '5px', flexGrow: 1}}
                      placeholder="Add any special requests or notes here..."
                    ></textarea>
                </div>
            </div>
        </div>
        
        {/* --- Toggle Sections --- */}
        <ToggleSwitch 
            title="PCB Assembly" 
            description="Assembly cost starting from $0 with coupon." 
            checked={specs.pcbAssembly} 
            onChange={(e) => handleSpecChange('pcbAssembly', e.target.checked)} 
        />
        <ToggleSwitch 
            title="Stencil" 
            description="Order together with PCB." 
            checked={specs.stencil} 
            onChange={(e) => handleSpecChange('stencil', e.target.checked)} 
        />

      </div>

      <div className="spec-summary-column">
        <div className="summary-box">
            <h3>Order Summary</h3>
            <ul>
                <li>Base Material: <strong>{specs.baseMaterial}</strong></li>
                <li>Layers: <strong>{specs.layers}</strong></li>
                <li>Dimensions: <strong>{specs.dimensionsX}x{specs.dimensionsY} mm</strong></li>
                <li>Thickness: <strong>{specs.pcbThickness}</strong></li>
                <li>Color: <strong>{specs.pcbColor}</strong></li>
                <li>Quantity: <strong>{specs.pcbQty}</strong></li>
            </ul>
            <p className="price-info">Price calculation is disabled for this demo.</p>
            <button className="add-to-cart-btn" onClick={handleGetOffer}>Get Offer</button>
        </div>
      </div>
    </div>
  );
}