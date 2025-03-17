import React, { Fragment, useEffect, useState } from 'react'

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
  const updateConfiguration = (paramsCategory, paramsField, paramsValue) => {
    setParams((prevParams) => ({
      ...prevParams,
      [paramsCategory]: {
        ...prevParams[paramsCategory],
        [paramsField]: paramsValue, // Toggle hybrid_search
      },
    }));
  };

  const handleCheckboxChange = (paramsCategory, paramsField) =>{
    setParams((prevParams) => ({
      ...prevParams,
      [paramsCategory]: {
        ...prevParams[paramsCategory],
        [paramsField]: !prevParams[paramsCategory][paramsField], // Toggle hybrid_search
      },
    }));
  }

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
                <Fragment  key={`parameterData_${parametersData.name}_${j}`}>
                {parametersData.type==='Boolean' ? 
                <div className="col-6 d-flex gap-2 mb-3" style={j === 0 ? { flexBasis: 'content' } : {}}>
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
            
            {/* <div className="col-4">
            <label htmlFor="temperature" className="form-label">
              Temperature:<span className="text-primary"> ({params.temperature})</span>
            </label>
            <div className="position-relative">
              <input
                type="range"
                className="form-range"
                id="temperature"
                min="0"
                max="1"
                step="0.1"
                value={params.temperature}
                onChange={(e) =>
                  updateConfiguration("temperature", e.target.value)
                }
              />
            </div>
            </div>
            <div className="col-4">
            <label htmlFor="top-p" className="form-label">
              Top P:<span className="text-primary"> ({params.top_p})</span>
            </label>
            <div className="position-relative">
              <input
                type="range"
                className="form-range"
                id="top-p"
                min="0"
                max="1"
                step="0.05"
                value={params.top_p}
                onChange={(e) => updateConfiguration("top_p", e.target.value)}
              />
            </div>
            </div>
            <div className="col-4">
            <label htmlFor="frequency-penalty:" className="form-label">
              Frequency Penalty:<span className="text-primary"> ({params.frequency_penalty})</span>
            </label>
            <div className="position-relative">
              <input
                type="range"
                className="form-range"
                id="frequency-penalty:"
                min="-2"
                max="2"
                step="0.1"
                value={params.frequency_penalty}
                onChange={(e) =>
                  updateConfiguration("frequency_penalty", e.target.value)
                }
              />
            </div>
            </div>
            <div className="col-4">
            <label htmlFor="presence-penalty" className="form-label">
              Presence Penalty:<span className="text-primary"> ({params.presence_penalty})</span>
            </label>
            <div className="position-relative">
              <input
                type="range"
                className="form-range"
                id="presence-penalty"
                min="-2"
                max="2"
                step="0.1"
                value={params.presence_penalty}
                onChange={(e) =>
                  updateConfiguration("presence_penalty", e.target.value)
                }
              />
            </div>
            </div> */}
          </div>
        </div>
      </div>
    ))}
    
    </>
  )
}

export default ChatFormParametersComponent