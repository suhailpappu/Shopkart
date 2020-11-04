import React from 'react'
// import { connect } from 'react-redux'
import {Container,Row,Col} from 'react-bootstrap'
export const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <h1>Footer &copy; Shopkart</h1>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

// export default connect(mapStateToProps, mapDispatchToProps)(Footer)
export default Footer
