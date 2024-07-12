import React from 'react'

import { 
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCol,
    MDBBadge,
    MDBCardBody,
    MDBBtn,
    MDBIcon,
    MDBCardFooter
  } from 'mdb-react-ui-kit';

const SuperiorData = () => {
  return (
    <MDBContainer fluid>
      <MDBRow className='justify-content-center'>
        <MDBCol md='10'>
          <section>
            <h5 className='mb-4'>Last month</h5>
            <MDBRow>
              <MDBCol md='4' className='mb-md-0'>
                <MDBCard>
                  <MDBCardBody>
                    <div className='d-flex align-items-center'>
                      <div className='flex-shrink-0'>
                        <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                          <MDBIcon icon='hand-point-up' size='lg' className='text-white fa-fw' />
                        </div>
                      </div>
                      <div className='flex-grow-1 ms-4'>
                        <p className='text-muted mb-1'>Clicks</p>
                        <h2 className='mb-0'>
                          71,897
                          <span className='text-success' style={{ fontSize: '0.875rem' }}>
                            <MDBIcon icon='arrow-up' className='ms-1' size='sm' />
                            <span> 5.4%</span>
                          </span>
                        </h2>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md='4' className='mb-md-0'>
                <MDBCard>
                  <MDBCardBody>
                    <div className='d-flex align-items-center'>
                      <div className='flex-shrink-0'>
                        <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                          <MDBIcon icon='eye' size='lg' className='text-white fa-fw' />
                        </div>
                      </div>
                      <div className='flex-grow-1 ms-4'>
                        <p className='text-muted mb-1'>Impressions</p>
                        <h2 className='mb-0'>
                          146,926
                          <span className='text-success' style={{ fontSize: '0.875rem' }}>
                            <MDBIcon icon='arrow-up' className='ms-1' size='sm' />
                            <span> 8.3%</span>
                          </span>
                        </h2>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol md='4' className='mb-md-0'>
                <MDBCard>
                  <MDBCardBody>
                    <div className='d-flex align-items-center'>
                      <div className='flex-shrink-0'>
                        <div className='p-3 bg-primary rounded-4 shadow-2-strong'>
                          <MDBIcon icon='chart-pie' size='lg' className='text-white fa-fw' />
                        </div>
                      </div>
                      <div className='flex-grow-1 ms-4'>
                        <p className='text-muted mb-1'>Average CTR</p>
                        <h2 className='mb-0'>
                          24.57%
                          <span className='text-danger' style={{ fontSize: '0.875rem' }}>
                            <MDBIcon icon='arrow-down' className='ms-1' size='sm' />
                            <span> 3.9%</span>
                          </span>
                        </h2>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default SuperiorData
