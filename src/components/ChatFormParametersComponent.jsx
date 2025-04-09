import React, { Fragment, useEffect, useState } from 'react'
import { chatServices } from '../utils/AxiosService'; // Corrected path to the AxiosService file
import { useSelector } from 'react-redux';


const Parameters = [
    {
        parameterLabel: "Configuration Parameters",
        parameterName: 'model_configuration',
        parameters:[
            {
                name: 'max_tokens',
                label: 'Max Response',
                minVal: 0,
                maxVal: 1000,
                step: 1
            },
            {
                name: 'temperature',
                label: 'Temperature',
                minVal: 0,
                maxVal: 1,
                step: 0.1
            },
            {
                name: 'top_p',
                label: 'Top P',
                minVal: 0,
                maxVal: 1,
                step: 0.05
            },
            {
                name: 'frequency_penalty',
                label: 'Frequency Penalty',
                minVal: -2,
                maxVal: 2,
                step: 0.1
            },
            {
                name: 'presence_penalty',
                label: 'Presence Penalty',
                minVal: -2,
                maxVal: 2,
                step: 0.1
            }
        ]
    },
    {
        parameterLabel: "RAG Parameters",
        parameterName: 'rag_configuration',
        parameters:[
            {
                name: 'hybrid_search',
                label: 'Hybrid Search',
                type: 'Boolean'
            },
            {
                name: 'text_search',
                label: 'Text Search',
                type: 'Boolean'
            },
            {
                name: 'alpha',
                label: 'Alpha',
                minVal: 0,
                maxVal: 1,
                step: 0.1
            },
            {
                name: 'hybrid_top_k_documents',
                label: 'Hybrid Document',
                minVal: 0,
                maxVal: 20,
                step: 1
            },
            {
                name: 'text_top_k_documents',
                label: 'Text Document',
                minVal: 0,
                maxVal: 20,
                step: 1
            },
            {
                name: 'similarity_top_k_documents',
                label: 'Similarity Top - K',
                minVal: 0,
                maxVal: 20,
                step: 1
            },
            {
                name: 'percentile_cutoff',
                label: 'Percentile Cutoff',
                minVal: 0,
                maxVal: 1,
                step: 0.1
            },
            {
                name: 'threshold_cutoff',
                label: 'Threshold Cutoff',
                minVal: 0,
                maxVal: 1,
                step: 0.1
            }
        ]
    }
]

const ChatFormParametersComponent = (props) => {
  // Get activeGptDetails from Redux store
  const activeGptDetails = props.activeGptDetails;
  const gptId = props.gptId;
  console.log("props",props);
  
  const [params, setParams] = useState({
    model_configuration: {
      max_tokens: 800,
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
    },
    rag_configuration: {
      hybrid_top_k_documents: 8,
      text_top_k_documents: 8,
      similarity_top_k_documents: 6,
      hybrid_search: false,
      text_search: false,
      percentile_cutoff: 0.5,
      threshold_cutoff: 0.7,
      alpha: 0.5
    },
  });
  
  // Add state for file handling
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [useRag, setUseRag] = useState(false);
  
  const updateConfiguration = (paramsCategory, paramsField, paramsValue) => {
    setParams((prevParams) => ({
      ...prevParams,
      [paramsCategory]: {
        ...prevParams[paramsCategory],
        [paramsField]: paramsValue,
      },
    }));
  };

  const handleCheckboxChange = (paramsCategory, paramsField) =>{
    setParams((prevParams) => ({
      ...prevParams,
      [paramsCategory]: {
        ...prevParams[paramsCategory],
        [paramsField]: !prevParams[paramsCategory][paramsField],
      },
    }));
  }

  // Handle file selection
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // Handle file upload
  const handleUpload = async () => {
    // Get GPT ID and name from Redux store
    console.log("Active GPT Details",activeGptDetails);
    const gpt_id = activeGptDetails?._id;
    const gpt_name = activeGptDetails?.description;
    
    if (!gpt_id || !gpt_name) {
      setUploadStatus('Error: No active GPT selected');
      return;
    }
    
    if (files.length === 0 && !useRag) {
      setUploadStatus('Please select files to upload or enable RAG');
      return;
    }
    
    // Prepare GPT data from the params
    const gptData = {
      ...params,
      use_rag: useRag,
      use_case_id: props.current_use_case_id || ""
    };
    
    setUploading(true);
    setUploadStatus('Uploading...');
    
    try {
      const response = await chatServices.uploadDocuments(gpt_id, gpt_name, gptData, files);
      console.log(response);
      
      if (response.status === 200) {
        setUploadStatus('Upload successful: ' + response.data.message);
        setFiles([]); // Clear the files after successful upload

                // Add a slight delay before refreshing the page
      setTimeout(() => {
        window.location.reload(); // Refresh the page
      }, 1500); // 1.5 second delay to show the success message before refreshing
      } else {
        setUploadStatus('Upload failed: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('Error uploading files: ' + (error.response?.data?.error || error.message));
    } finally {
      setUploading(false);
    }
  };

  useEffect(()=>{
    props.updateParams(params);
  },[params]);

  return (
    <>
    {Parameters && Parameters.map((parameterList, i)=>(
        <div className="nia-config-options d-flex" key={`parameterList_${i}`}>
        <div className="pe-3"><div style={{width: '150px'}}>{parameterList.parameterLabel} </div></div>
        <div className="flex-grow-1">
          <div className="row">
            {parameterList && parameterList.parameters.map((parametersData, j)=>(
                <Fragment key={`parameterData_${parametersData.name}_${j}`}>
                {parametersData.type==='Boolean' ? 
                <div className="col-6 d-flex gap-2 mb-3 nia-option-checkbox-container" style={j === 0 ? { flexBasis: 'content' } : {}}>
                    <input type='checkbox' id={parametersData.name} value={parametersData.name} checked={params?.[parameterList.parameterName]?.[parametersData.name]} onChange={()=>handleCheckboxChange(parameterList.parameterName, parametersData.name)} />
                    <label htmlFor={parametersData.name} className="form-label flex-grow-1 mb-0"> {parametersData.label} </label>
                </div> : 
                <div className="col-4">
                <label htmlFor={parametersData.name} className="form-label">
                  {parametersData.label}:<span className="text-primary"> ({params?.[parameterList.parameterName]?.[parametersData.name]})</span>
                </label>
                <div className="position-relative">
                  <input
                    type="range"
                    className="form-range"
                    id={parametersData.name}
                    min={parametersData.minVal}
                    max={parametersData.maxVal}
                    step={parametersData.step}
                    value={params?.[parameterList.parameterName]?.[parametersData.name]}
                    onChange={(e) =>
                      updateConfiguration(parameterList.parameterName, parametersData.name, e.target.value)
                    }
                  />
                </div>
                </div>
                }
                </Fragment>
            ))}
          </div>
        </div>
      </div>
    ))}
    
    {/* Add the file upload section */}
    <div className="nia-config-options d-flex mt-4">
      <div className="pe-3"><div style={{width: '150px'}}>Document Upload</div></div>
      <div className="flex-grow-1">
        <div className="row">
          <div className="col-12 mb-3">
            <input 
              type="file" 
              className="form-control" 
              multiple 
              onChange={handleFileChange} 
            />
            <div className="form-text">
              {files.length > 0 ? `${files.length} file(s) selected` : 'No files selected'}
            </div>
          </div>
          <div className="col-12 mb-3 d-flex align-items-center">
            <button 
              className="btn btn-primary me-3" 
              onClick={handleUpload} 
              //disabled={uploading || !activeGptDetails?._id}
            >
              {uploading ? 'Uploading...' : 'Upload Documents'}
            </button>
            {uploadStatus && (
              <div className={`text-${uploadStatus.includes('successful') ? 'success' : 'danger'}`}>
                {uploadStatus}
              </div>
            )}
          </div>
          <div className="col-12">
            <div className="form-text">
              {activeGptDetails ? (
                <>
                  Current GPT ID: {activeGptDetails._id}<br/>
                  Current GPT Name: {activeGptDetails.name}
                </>
              ) : (
                'No active GPT selected'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ChatFormParametersComponent