import { NewsPost } from '@/types/xclasses'

export const sampleNews: NewsPost[] = [
  {
    slug: 'x-vrthing-development-update',
    title: 'X-Vrything Development Update — Coming Soon',
    tag: 'Release',
    excerpt: 'We\'re excited to share the latest progress on X-Vrything development. Our team has been working hard to bring you an innovative solution that will revolutionize how you work.',
    body: `# X-Vrything Development Update — Coming Soon

We're excited to share the latest progress on X-Vrything development. Our team has been working hard to bring you an innovative solution that will revolutionize how you work.

## What's New

- **Enhanced Performance**: We've optimized the core engine for 40% faster processing
- **New UI Components**: A completely redesigned interface with improved accessibility
- **Advanced Analytics**: Real-time insights and reporting capabilities
- **API Improvements**: Better integration with third-party services

## Timeline

We're targeting a Q2 2024 release for the public beta. Early access will be available to our community members first.

## Stay Updated

Follow our X-Classes page for regular updates, tutorials, and behind-the-scenes content as we prepare for launch.

*Thank you for your patience and continued support!*`,
    publishedAt: '2024-02-15T10:00:00Z'
  },
  {
    slug: 'new-feature-announcement',
    title: 'Introducing Advanced Workflow Builder',
    tag: 'Feature',
    excerpt: 'Our new workflow builder makes it easier than ever to create complex automation sequences with a drag-and-drop interface.',
    body: `# Introducing Advanced Workflow Builder

Our new workflow builder makes it easier than ever to create complex automation sequences with a drag-and-drop interface.

## Key Features

- **Visual Editor**: Drag and drop components to build workflows
- **Conditional Logic**: Add if/then/else conditions to your workflows
- **Integration Hub**: Connect with 50+ popular services
- **Real-time Testing**: Test your workflows before deploying

## Getting Started

1. Navigate to the Workflow Builder in your dashboard
2. Choose from our library of pre-built templates
3. Customize your workflow with the visual editor
4. Test and deploy with confidence

Ready to get started? Check out our tutorial videos in the Videos section!`,
    publishedAt: '2024-02-12T14:30:00Z'
  },
  {
    slug: 'community-spotlight-february',
    title: 'Community Spotlight: February 2024',
    tag: 'Guide',
    excerpt: 'This month we\'re highlighting amazing projects from our community members and sharing tips for getting the most out of X-vrthing.',
    body: `# Community Spotlight: February 2024

This month we're highlighting amazing projects from our community members and sharing tips for getting the most out of X-vrthing.

## Featured Projects

### Sarah's E-commerce Automation
Sarah from Melbourne has created an incredible automation system that handles her entire e-commerce workflow, from inventory management to customer support.

### Mike's Data Pipeline
Mike's data processing pipeline processes over 10,000 records daily, saving him hours of manual work each week.

## Community Tips

- **Use Templates**: Start with our pre-built templates and customize from there
- **Join Discussions**: Our community forum is full of helpful tips and tricks
- **Share Your Work**: We love seeing what you build!

## Upcoming Events

- **March 15**: Live Q&A session with our development team
- **March 22**: Community showcase webinar

Keep building amazing things!`,
    publishedAt: '2024-02-08T16:00:00Z'
  },
  {
    slug: 'api-v2-release',
    title: 'API v2.0 Release Notes',
    tag: 'Release',
    excerpt: 'We\'ve released API v2.0 with improved performance, better error handling, and new endpoints for advanced integrations.',
    body: `# API v2.0 Release Notes

We've released API v2.0 with improved performance, better error handling, and new endpoints for advanced integrations.

## What's New

### Performance Improvements
- 60% faster response times
- Reduced memory usage
- Better caching mechanisms

### New Endpoints
- \`/workflows/validate\` - Validate workflow configurations
- \`/analytics/real-time\` - Get real-time analytics data
- \`/integrations/status\` - Check integration health

### Breaking Changes
- Authentication now requires API v2.0 tokens
- Some response formats have been updated
- Deprecated endpoints will be removed in v2.1

## Migration Guide

Check our documentation for a complete migration guide from v1.x to v2.0.

## Support

Need help with the migration? Our support team is here to help!`,
    publishedAt: '2024-02-03T09:00:00Z'
  },
  {
    slug: 'best-practices-guide',
    title: 'X-vrthing Best Practices Guide',
    tag: 'Guide',
    excerpt: 'Learn the best practices for building efficient and maintainable workflows with X-vrthing.',
    body: `# X-vrthing Best Practices Guide

Learn the best practices for building efficient and maintainable workflows with X-vrthing.

## Workflow Design

### Keep It Simple
- Start with simple workflows and add complexity gradually
- Use descriptive names for your workflows and steps
- Document your workflows for future reference

### Error Handling
- Always include error handling steps
- Use conditional logic to handle different scenarios
- Test your workflows thoroughly before deploying

### Performance
- Optimize your data processing steps
- Use batch operations when possible
- Monitor your workflow performance regularly

## Security

- Use environment variables for sensitive data
- Implement proper authentication and authorization
- Regularly review and update your access controls

## Maintenance

- Schedule regular workflow reviews
- Keep your integrations updated
- Monitor logs for any issues

## Getting Help

- Check our documentation first
- Join our community forum
- Contact support for complex issues

Happy building!`,
    publishedAt: '2024-01-28T11:30:00Z'
  }
]
