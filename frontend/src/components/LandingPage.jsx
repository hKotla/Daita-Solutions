import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { apiService } from '../services/api';
import { Brain, TestTube, Cog, Mail, Phone, MapPin, Clock, Star, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

const iconMap = {
  Brain,
  TestTube,
  Cog
};

const LandingPage = () => {
  // State for all data
  const [data, setData] = useState({
    company: null,
    services: [],
    team: [],
    testimonials: [],
    caseStudies: [],
    contact: null
  });
  
  // Loading states
  const [loading, setLoading] = useState({
    company: true,
    services: true,
    team: true,
    testimonials: true,
    caseStudies: true,
    contact: true
  });
  
  // Error states
  const [errors, setErrors] = useState({});
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Load all data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      // Load company data
      try {
        const companyData = await apiService.getCompany();
        setData(prev => ({ ...prev, company: companyData }));
        setLoading(prev => ({ ...prev, company: false }));
      } catch (error) {
        console.error('Error loading company data:', error);
        setErrors(prev => ({ ...prev, company: error.message }));
        setLoading(prev => ({ ...prev, company: false }));
      }

      // Load services data
      try {
        const servicesData = await apiService.getServices();
        setData(prev => ({ ...prev, services: servicesData }));
        setLoading(prev => ({ ...prev, services: false }));
      } catch (error) {
        console.error('Error loading services data:', error);
        setErrors(prev => ({ ...prev, services: error.message }));
        setLoading(prev => ({ ...prev, services: false }));
      }

      // Load team data
      try {
        const teamData = await apiService.getTeam();
        setData(prev => ({ ...prev, team: teamData }));
        setLoading(prev => ({ ...prev, team: false }));
      } catch (error) {
        console.error('Error loading team data:', error);
        setErrors(prev => ({ ...prev, team: error.message }));
        setLoading(prev => ({ ...prev, team: false }));
      }

      // Load testimonials data
      try {
        const testimonialsData = await apiService.getTestimonials();
        setData(prev => ({ ...prev, testimonials: testimonialsData }));
        setLoading(prev => ({ ...prev, testimonials: false }));
      } catch (error) {
        console.error('Error loading testimonials data:', error);
        setErrors(prev => ({ ...prev, testimonials: error.message }));
        setLoading(prev => ({ ...prev, testimonials: false }));
      }

      // Load case studies data
      try {
        const caseStudiesData = await apiService.getCaseStudies();
        setData(prev => ({ ...prev, caseStudies: caseStudiesData }));
        setLoading(prev => ({ ...prev, caseStudies: false }));
      } catch (error) {
        console.error('Error loading case studies data:', error);
        setErrors(prev => ({ ...prev, caseStudies: error.message }));
        setLoading(prev => ({ ...prev, caseStudies: false }));
      }

      // Load contact data
      try {
        const contactData = await apiService.getContact();
        setData(prev => ({ ...prev, contact: contactData }));
        setLoading(prev => ({ ...prev, contact: false }));
      } catch (error) {
        console.error('Error loading contact data:', error);
        setErrors(prev => ({ ...prev, contact: error.message }));
        setLoading(prev => ({ ...prev, contact: false }));
      }

    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear any previous errors/success messages when user starts typing
    if (formError) setFormError('');
    if (formSuccess) setFormSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    setFormSuccess('');

    try {
      const response = await apiService.submitContactMessage(formData);
      setFormSuccess('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', company: '', message: '' });
      console.log('Message submitted successfully:', response);
    } catch (error) {
      setFormError(error.message || 'Failed to submit message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setFormLoading(false);
    }
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#00FFD1' }} />
    </div>
  );

  // Error component
  const ErrorMessage = ({ message }) => (
    <div className="text-red-400 text-center p-4">
      Error: {message}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Header */}
      <header className="dark-header">
        <div className="dark-logo">
          <h2 className="heading-2" style={{ color: '#00FFD1' }}>
            {loading.company ? 'DAITA Solutions' : (data.company?.name || 'DAITA Solutions')}
          </h2>
        </div>
        <nav className="dark-nav">
          <a href="#services" className="dark-nav-link">Services</a>
          <a href="#about" className="dark-nav-link">About</a>
          <a href="#team" className="dark-nav-link">Team</a>
          <a href="#testimonials" className="dark-nav-link">Testimonials</a>
          <a href="#case-studies" className="dark-nav-link">Case Studies</a>
          <a href="#contact" className="dark-nav-link">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="dark-container pad-xxlarge">
        <div className="dark-content-container text-center">
          {loading.company ? (
            <LoadingSpinner />
          ) : errors.company ? (
            <ErrorMessage message={errors.company} />
          ) : (
            <>
              <h1 className="display-huge mb-8">{data.company?.tagline}</h1>
              <p className="body-large mb-12 max-w-4xl mx-auto text-white/85">
                {data.company?.description}
              </p>
            </>
          )}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="btn-primary">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button className="btn-secondary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="dark-container pad-xlarge bg-gray-950/30">
        <div className="dark-content-container">
          <div className="text-center mb-16">
            <h2 className="display-large mb-6">Our Services</h2>
            <p className="body-large text-white/75 max-w-3xl mx-auto">
              Cutting-edge AI solutions that drive transformation and deliver measurable results
            </p>
          </div>
          
          {loading.services ? (
            <LoadingSpinner />
          ) : errors.services ? (
            <ErrorMessage message={errors.services} />
          ) : (
            <div className="dark-grid">
              {data.services.map((service) => {
                const IconComponent = iconMap[service.icon];
                return (
                  <Card key={service.id} className="bg-gray-900/50 border-white/25 dark-transition dark-hover">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0, 255, 209, 0.1)' }}>
                          <IconComponent className="h-8 w-8" style={{ color: '#00FFD1' }} />
                        </div>
                        <CardTitle className="heading-2">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="body-medium text-white/85 mb-6">
                        {service.description}
                      </CardDescription>
                      <div className="space-y-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5" style={{ color: '#00FFD1' }} />
                            <span className="body-small text-white/90">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="dark-container pad-xlarge">
        <div className="dark-content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="display-large mb-8">About DAITA Solutions</h2>
            <p className="body-large text-white/85 mb-8">
              Founded by AI pioneers and industry experts, DAITA Solutions bridges the gap between 
              cutting-edge artificial intelligence research and practical business applications. 
              We specialize in transforming traditional operations through intelligent automation, 
              robust AI system validation, and revolutionary GenAI-powered quality engineering.
            </p>
            <p className="body-medium text-white/75 mb-12">
              Our team of PhD researchers, certified engineers, and industry veterans has 
              successfully delivered AI transformations for Fortune 500 companies across 
              finance, healthcare, e-commerce, and manufacturing sectors.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="display-medium mb-4" style={{ color: '#00FFD1' }}>50+</div>
                <p className="body-medium">Successful AI Implementations</p>
              </div>
              <div className="text-center">
                <div className="display-medium mb-4" style={{ color: '#00FFD1' }}>$500M+</div>
                <p className="body-medium">Cost Savings Generated</p>
              </div>
              <div className="text-center">
                <div className="display-medium mb-4" style={{ color: '#00FFD1' }}>99.9%</div>
                <p className="body-medium">System Reliability Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="dark-container pad-xlarge bg-gray-950/30">
        <div className="dark-content-container">
          <div className="text-center mb-16">
            <h2 className="display-large mb-6">Our Expert Team</h2>
            <p className="body-large text-white/75 max-w-3xl mx-auto">
              Meet the AI pioneers driving innovation and delivering exceptional results
            </p>
          </div>
          
          {loading.team ? (
            <LoadingSpinner />
          ) : errors.team ? (
            <ErrorMessage message={errors.team} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.team.map((member) => (
                <Card key={member.id} className="bg-gray-900/50 border-white/25 text-center dark-transition dark-hover">
                  <CardHeader>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                    />
                    <CardTitle className="heading-2">{member.name}</CardTitle>
                    <Badge className="bg-cyan-900/50 text-cyan-100 mx-auto">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="body-small text-white/75">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="dark-container pad-xlarge">
        <div className="dark-content-container">
          <div className="text-center mb-16">
            <h2 className="display-large mb-6">Client Success Stories</h2>
            <p className="body-large text-white/75 max-w-3xl mx-auto">
              Hear from industry leaders who transformed their businesses with our AI solutions
            </p>
          </div>
          
          {loading.testimonials ? (
            <LoadingSpinner />
          ) : errors.testimonials ? (
            <ErrorMessage message={errors.testimonials} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="bg-gray-900/50 border-white/25 dark-transition dark-hover">
                  <CardHeader>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" style={{ color: '#00FFD1' }} />
                      ))}
                    </div>
                    <CardDescription className="body-medium text-white/85 italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="body-small font-semibold text-white">{testimonial.name}</p>
                      <p className="body-small text-white/60">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="dark-container pad-xlarge bg-gray-950/30">
        <div className="dark-content-container">
          <div className="text-center mb-16">
            <h2 className="display-large mb-6">Case Studies</h2>
            <p className="body-large text-white/75 max-w-3xl mx-auto">
              Real-world transformations delivering measurable impact across industries
            </p>
          </div>
          
          {loading.caseStudies ? (
            <LoadingSpinner />
          ) : errors.caseStudies ? (
            <ErrorMessage message={errors.caseStudies} />
          ) : (
            <div className="space-y-8">
              {data.caseStudies.map((study) => (
                <Card key={study.id} className="bg-gray-900/50 border-white/25 dark-transition dark-hover">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <CardTitle className="heading-2 mb-2 md:mb-0">{study.title}</CardTitle>
                      <Badge className="bg-cyan-900/50 text-cyan-100 w-fit">
                        {study.industry}
                      </Badge>
                    </div>
                    <CardDescription className="body-medium text-white/75">
                      <strong>Client:</strong> {study.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="heading-3 mb-2" style={{ color: '#00FFD1' }}>Challenge</h4>
                        <p className="body-medium text-white/85">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="heading-3 mb-2" style={{ color: '#00FFD1' }}>Solution</h4>
                        <p className="body-medium text-white/85">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="heading-3 mb-3" style={{ color: '#00FFD1' }}>Results</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {study.results.map((result, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5" style={{ color: '#00FFD1' }} />
                              <span className="body-small text-white/90">{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="dark-container pad-xlarge">
        <div className="dark-content-container">
          <div className="text-center mb-16">
            <h2 className="display-large mb-6">Get Started Today</h2>
            <p className="body-large text-white/75 max-w-3xl mx-auto">
              Ready to transform your business with AI? Let's discuss your project and explore how we can help.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Card className="bg-gray-900/50 border-white/25">
                <CardHeader>
                  <CardTitle className="heading-2 mb-6">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading.contact ? (
                    <LoadingSpinner />
                  ) : errors.contact ? (
                    <ErrorMessage message={errors.contact} />
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6" style={{ color: '#00FFD1' }} />
                        <span className="body-medium">{data.contact?.email}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6" style={{ color: '#00FFD1' }} />
                        <span className="body-medium">{data.contact?.phone}</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 mt-1" style={{ color: '#00FFD1' }} />
                        <span className="body-medium">{data.contact?.address}</span>
                      </div>
                      <div className="flex items-start gap-4">
                        <Clock className="h-6 w-6 mt-1" style={{ color: '#00FFD1' }} />
                        <span className="body-medium">{data.contact?.hours}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="bg-gray-900/50 border-white/25">
                <CardHeader>
                  <CardTitle className="heading-2 mb-6">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-white/25 text-white"
                        disabled={formLoading}
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-black/50 border-white/25 text-white"
                        disabled={formLoading}
                      />
                    </div>
                    <Input
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-black/50 border-white/25 text-white"
                      disabled={formLoading}
                    />
                    <Textarea
                      name="message"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="bg-black/50 border-white/25 text-white"
                      disabled={formLoading}
                    />
                    
                    {formError && (
                      <div className="text-red-400 text-sm">{formError}</div>
                    )}
                    
                    {formSuccess && (
                      <div className="text-green-400 text-sm">{formSuccess}</div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="btn-primary w-full" 
                      disabled={formLoading}
                    >
                      {formLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dark-container bg-gray-950 border-t border-white/25 py-12">
        <div className="dark-content-container">
          <div className="text-center">
            <h3 className="heading-2 mb-4" style={{ color: '#00FFD1' }}>
              {loading.company ? 'DAITA Solutions' : (data.company?.name || 'DAITA Solutions')}
            </h3>
            <p className="body-medium text-white/75 mb-8">
              {loading.company ? 'Transforming Business Through Intelligent AI Solutions' : (data.company?.tagline || 'Transforming Business Through Intelligent AI Solutions')}
            </p>
            <Separator className="bg-white/25 mb-8" />
            <p className="body-small text-white/50">
              © 2025 DAITA Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;